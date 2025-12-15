import { Router, Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
import prisma from '../config/database';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const router = Router();

interface AuthRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
}

interface MagicLinkRequestBody {
  email: string;
}

interface VerifyQuery {
  token?: string;
  email?: string;
}

interface CompanyDocument {
  id: string;
  email: string;
}

const generateToken = (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
  // Store email with token for verification
  return { token, expires, email };
};

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Try to get token from cookie first, then from Authorization header
  const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.post("/magic-link", async (req: Request<{}, {}, MagicLinkRequestBody>, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Busca ou cria company
    let company: CompanyDocument | null = await prisma.company.findUnique({ 
      where: { email } 
    });
    
    if (!company) {
      company = await prisma.company.create({
        data: { email }
      });
    }

    // Generate magic link token
    const { token, expires } = generateToken(email);
    const magicLink = `${
      process.env.FRONTEND_URL
    }/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Seu link de acesso - EcoChange",
      html: `
        <div style="background-color:#ffffff; max-width:600px; margin:0 auto; padding:24px; font-family:ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
          <div style="border:1px solid #00e07f; border-radius:12px; padding:28px; background:linear-gradient(45deg, #002e34 0%, #00e07f 100%); text-align:center;">
            <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:12px;">
              <div style="width:10px; height:10px; background:#00e07f; border-radius:50%;"></div>
              <div style="font-weight:700; color:#ffffff; letter-spacing:0.2px;">EcoChange</div>
            </div>
            <h1 style="color:#ffffff; font-size:24px; line-height:32px; margin:0 0 12px 0;">Bem-vindo(a) ao EcoChange</h1>
            <p style="color:#ffffff; font-size:16px; margin:0 0 24px 0;">Clique no botão abaixo para acessar sua conta.</p>
            <a href="${magicLink}" style="display:inline-block; background:#002e34; color:#ffffff; padding:12px 22px; text-decoration:none; border-radius:8px; font-weight:700;">Acessar minha conta</a>
            <p style="color:#ffffff; font-size:14px; margin:22px 0 0 0;">Este link expira em 15 minutos por questões de segurança.</p>
          </div>
          <div style="text-align:center; margin-top:16px;">
            <p style="color:#6b7280; font-size:12px; margin:0;">Se você não solicitou este email, por favor ignore.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send magic link" });
    }

    return res.json({ message: "Magic link sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send magic link" });
  }
});

router.get("/verify", async (req: Request<{}, {}, {}, VerifyQuery>, res: Response) => {
  try {
    const { token, email } = req.query;
    if (!token || !email) return res.status(400).json({ error: "Token and email are required" });

    // Find company in database
    const company: CompanyDocument | null = await prisma.company.findUnique({ 
      where: { email: email as string } 
    });
    
    if (!company) return res.status(404).json({ error: "Company not found" });

    // Create JWT with company data
    const jwtToken = jwt.sign(
      {
        email: company.email,
        id: company.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    // For cross-site requests from the frontend we need SameSite=None and Secure
    // Set HTTP-only cookie with JWT token
    // In development (localhost), sameSite='lax' works fine since both are on localhost
    // In production with different domains, use sameSite='none' and secure=true
    res.cookie('authToken', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    
    console.log(`🍪 JWT cookie set for company ID: ${company.id}`);
    console.log(`🍪 Cookie value: ${jwtToken.substring(0, 20)}...`);

    return res.json({
      token: jwtToken,
      user: {
        id: company.id,
        email: company.email,
      },
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.get("/me", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const company: any = await prisma.company.findUnique({
      where: { email: req.user?.email },
      select: {
        id: true,
        email: true,
        onboarded: true,
        company_name: true,
        industry: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.json({
      user: {
        id: company.id,
        email: company.email,
        onboarded: company.onboarded,
        company_name: company.company_name,
        industry: company.industry,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch company data" });
  }
});

export default router;
import { Router, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
// Import your User model, transporter, generateToken, and verifyToken middleware here
// import User from '../models/User';
// import transporter from '../config/email';
// import { generateToken } from '../utils/tokens';
// import { verifyToken } from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user?: {
    email: string;
    id: string;
    nome: string;
  };
}

interface MagicLinkRequestBody {
  email: string;
}

interface VerifyQuery {
  token?: string;
  email?: string;
}

interface UserDocument {
  _id: string;
  email: string;
  nome: string;
  setupComplete: boolean;
  preferredPrompt?: string;
  subscription?: any;
  credits: {
    available: number;
    totalPurchased: number;
    lastPurchaseDate: Date;
  };
}


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  // For port 465 use secure true, for 587/STARTTLS use false
  secure: (process.env.SMTP_PORT === "465"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const generateToken = (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes
  // Store email with token for verification
  return { token, expires, email };
};

const verifyToken = (req: AuthRequest, res: Response, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

router.post("/magic-link", async (req: Request<{}, {}, MagicLinkRequestBody>, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Busca ou cria usuario
    //let user: UserDocument | null = await User.findOne({ email });
    //if (!user) {
    //  criação de usuario aqui
    //}

    // Generate magic link token
    const { token, expires } = generateToken(email);
    const magicLink = `${
      process.env.FRONTEND_URL
    }/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email
    await transporter.sendMail({
      from: `"eco change" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Seu link de acesso - eco change",
      html: `
        <div style="background-color:#ffffff; max-width:600px; margin:0 auto; padding:24px; font-family:ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
          <div style="border:1px solid #00e07f; border-radius:12px; padding:28px; background:linear-gradient(45deg, #002e34 0%, #00e07f 100%); text-align:center;">
            <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:12px;">
              <div style="width:10px; height:10px; background:#00e07f; border-radius:50%;"></div>
              <div style="font-weight:700; color:#ffffff; letter-spacing:0.2px;">eco change</div>
            </div>
            <h1 style="color:#ffffff; font-size:24px; line-height:32px; margin:0 0 12px 0;">Bem-vindo(a) ao eco change</h1>
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

    return res.json({ message: "Magic link sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send magic link" });
  }
});

router.get("/verify", async (req: Request<{}, {}, {}, VerifyQuery>, res: Response) => {
  try {
    const { token, email } = req.query;
    if (!token) return res.status(400).json({ error: "Token is required" });

    // Encontra user no db
    //const user: UserDocument | null = await User.findOne({ email });
    //if (!user) return res.status(404).json({ error: "User not found" });

    //cria jwt com dados do user
    const jwtToken = jwt.sign(
      {
        //email: user.email,
        //id: user._id,
        //nome: user.nome,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      token: jwtToken,
      user: {
        //email: user.email,
        //nome: user.nome,
        //setupComplete: user.setupComplete,
      },
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

router.get("/me", verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    //const user: UserDocument | null = await User.findOne({ email: req.user?.email });
    //if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json({
      user: {
        //_id: user._id,
        //email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

export default router;
import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

const router = Router();

interface AuthRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
}

interface OnboardingData {
  company_name?: string;
  industry?: string;
  company_type?: string;
  country?: string;
  annual_revenue_range?: string;
  sustainability_goals?: string;
}

// Middleware to verify JWT token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// GET /api/onboarding/status - Check onboarding status
router.get('/status', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const company = await prisma.company.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        onboarded: true,
        company_name: true,
        industry: true,
        company_type: true,
        country: true,
        annual_revenue_range: true,
        sustainability_goals: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    return res.json({
      onboarded: company.onboarded,
      company,
    });
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return res.status(500).json({ error: "Failed to check onboarding status" });
  }
});

// POST /api/onboarding/update - Update onboarding information (partial)
router.post('/update', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const data: OnboardingData = req.body;

    // Validate that at least one field is provided
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "At least one field must be provided" });
    }

    const company = await prisma.company.update({
      where: { id: req.user.id },
      data: {
        company_name: data.company_name,
        industry: data.industry,
        company_type: data.company_type,
        country: data.country,
        annual_revenue_range: data.annual_revenue_range,
        sustainability_goals: data.sustainability_goals,
      },
      select: {
        id: true,
        email: true,
        company_name: true,
        industry: true,
        company_type: true,
        country: true,
        annual_revenue_range: true,
        sustainability_goals: true,
      },
    });

    return res.json({
      message: "Onboarding data updated successfully",
      company,
    });
  } catch (error) {
    console.error("Error updating onboarding data:", error);
    return res.status(500).json({ error: "Failed to update onboarding data" });
  }
});

// POST /api/onboarding/complete - Mark onboarding as complete
router.post('/complete', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const company = await prisma.company.update({
      where: { id: req.user.id },
      data: {
        onboarded: true,
      },
      select: {
        id: true,
        email: true,
        onboarded: true,
        company_name: true,
        industry: true,
      },
    });

    return res.json({
      message: "Onboarding completed successfully",
      company,
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return res.status(500).json({ error: "Failed to complete onboarding" });
  }
});

export default router;

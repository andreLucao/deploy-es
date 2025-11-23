import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import basicRoutes from "./routes/basic.routes";
import authRoutes from "./routes/authRoutes";
import calculatorRoutes from "./routes/calculator.routes";
import emissionProductsRoutes from "./routes/emission_products.routes";
import emissionFactorsRoutes from "./routes/emission_factors.routes";
import companiesRoutes from "./routes/companies.routes";
import adProductRoutes from "./routes/adProduct.routes";
import paymentRoutes from "./routes/paymentRoutes";
import stripeWebhook from "./routes/stripeWebhook";
import commentsRoutes from "./routes/commentsRoutes";
import productsRoutes from "./routes/products.routes";
import transactionsRoutes from "./routes/transactions.routes";
import creditsRoutes from "./routes/credits.routes";
import agentRoutes from "./routes/agent.routes";
import reportsRoutes from "./routes/reports.routes";
import reportRoutes from "./routes/report.routes";

const app: Application = express();
export const PORT = process.env.PORT || 3001;

// Middleware
app.use(
   cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
   })
);

app.use(
   "/api/stripe/webhook",
   express.raw({ type: "application/json" }),
   stripeWebhook
);

// Aumentar limite do body parser para aceitar imagens em base64 (50mb)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/", basicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/calculator", calculatorRoutes);
app.use("/api/emission-products", emissionProductsRoutes);
app.use("/api/emission-factors", emissionFactorsRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/adProducts", adProductRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/credits", creditsRoutes);
app.use("/api/agents", agentRoutes);

app.use("/api/reports", reportsRoutes);
app.use("/reports", reportRoutes);

export default app;

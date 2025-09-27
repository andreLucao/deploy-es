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

const app: Application = express();
export const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", basicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/calculator", calculatorRoutes);
app.use("/api/emission-products", emissionProductsRoutes);
app.use("/api/emission-factors", emissionFactorsRoutes);
app.use("/api/companies", companiesRoutes);

export default app;

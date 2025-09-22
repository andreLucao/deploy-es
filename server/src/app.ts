import express, { Application } from "express";
import basicRoutes from "./routes/basic.routes";
import authRoutes from "./routes/authRoutes";
import calculatorRoutes from "./routes/calculator.routes";
import emissionProductsRoutes from "./routes/emission_products.routes";
import emissionFactorsRoutes from "./routes/emission_factors.routes";
import companiesRoutes from "./routes/companies.routes";

const app: Application = express();
export const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", basicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/calculator", calculatorRoutes);
app.use("/api/emission-products", emissionProductsRoutes);
app.use("/api/emission-factors", emissionFactorsRoutes);
app.use("/api/companies", companiesRoutes);

export default app;

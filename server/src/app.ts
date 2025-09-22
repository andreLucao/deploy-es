import express from "express";
import calculatorRoutes from "./routes/calculator.routes";
import emissionProductsRoutes from "./routes/emission_products.routes";
import emissionFactorsRoutes from "./routes/emission_factors.routes";
import companiesRoutes from "./routes/companies.routes";

const app = express();
export const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/calculator", calculatorRoutes);
app.use("/api/emission-products", emissionProductsRoutes);
app.use("/api/emission-factors", emissionFactorsRoutes);
app.use("/api/companies", companiesRoutes);

export default app;

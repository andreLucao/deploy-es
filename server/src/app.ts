import express from "express";
import calculatorRoutes from "./routes/calculator.routes";
import emissionProductsRoutes from "./routes/emission_products.routes";
import emissionFactorsRoutes from "./routes/emission_factors.routes";
import companiesRoutes from "./routes/companies.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/calculator", calculatorRoutes);
app.use("/api/emission-products", emissionProductsRoutes);
app.use("/api/emission-factors", emissionFactorsRoutes);
app.use("/api/companies", companiesRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

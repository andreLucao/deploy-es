import express from "express";
import calculatorRoutes from "./routes/calculator.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/calculator", calculatorRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

import app, { PORT } from "./app";
import authRoutes from "./routes/authRoutes";

// Mount auth routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});

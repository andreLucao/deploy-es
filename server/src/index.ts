import app, { PORT } from "./app";
import dotenv from 'dotenv';

dotenv.config();

app.listen(PORT, () => {
   console.log(`Server is running at http://localhost:${PORT}`);
});

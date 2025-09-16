import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
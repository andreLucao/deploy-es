import { Router, Request, Response } from 'express';

const router = Router();

// Basic routes
router.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});

router.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});

export default router;

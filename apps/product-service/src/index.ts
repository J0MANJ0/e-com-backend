import express, { Request, Response } from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { protectAuth } from './middleware/auth.middleware.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Product service',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get('/test', protectAuth, (req, res) => {
  return res.json({
    success: true,
    message: 'Test product auth',
    userId: req.userId,
  });
});

app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.use((err: any, req: Request, res: Response) => {
  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error!',
  });
});

app.listen(8000, () =>
  console.log('\nProduct service running on http://localhost:8000\n')
);

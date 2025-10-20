import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { protectAuth } from './middleware/auth.middleware.js';

const app = new Hono();

app.use('*', clerkMiddleware());

app.get('/health', (c) => {
  return c.json({
    success: true,
    msg: 'Payment service',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get('/test', protectAuth, (c) => {
  return c.json({
    success: true,
    message: 'Payment service auth',
    userId: c.get('userId'),
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment service running on port:${info.port}`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

import Fastify from 'fastify';
import Clerk from '@clerk/fastify';
import { protectAuth } from './middleware/auth.middleware.js';
import { orderRoute } from './routes/order.route.js';
import { connectDB } from '@repo/order-db';

const fastify = Fastify();

fastify.register(Clerk.clerkPlugin);

fastify.get('/health', (request, reply) => {
  return reply.status(200).send({
    success: true,
    message: '🔥 Order service is live 🔥',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get('/test', { preHandler: protectAuth }, (request, reply) => {
  return reply.send({
    success: true,
    message: 'Order service auth',
    userId: request.userId,
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectDB();
    await fastify.listen({ port: 8001 });
    console.log('Order service running on http://localhost:8001');
  } catch (error: any) {
    fastify.log.error(error.message);
    process.exit(1);
  }
};

start();

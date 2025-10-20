import Fastify from 'fastify';
import Clerk from '@clerk/fastify';
import { protectAuth } from './middleware/auth.middleware.js';

const fastify = Fastify();

fastify.register(Clerk.clerkPlugin);

fastify.get('/health', (request, reply) => {
  return reply.status(200).send({
    success: true,
    msg: 'Product service',
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

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log('Order service running on port:8001');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

import { FastifyInstance } from 'fastify';
import { protectAdminAuth, protectAuth } from '../middleware/auth.middleware';
import { ORDER } from '@repo/order-db';

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    '/user-orders',
    { preHandler: protectAuth },
    async (request, reply) => {
      const orders = await ORDER.find({ userId: request.userId });

      return reply.send({
        success: true,
        orders,
      });
    }
  );
  fastify.get(
    '/orders',
    { preHandler: protectAdminAuth },
    async (request, reply) => {
      const orders = await ORDER.find();

      return reply.send({
        success: true,
        orders,
      });
    }
  );
};

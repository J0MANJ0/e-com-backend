import Clerk from '@clerk/fastify';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
  }
}

export const protectAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = Clerk.getAuth(request);

  if (!userId) {
    return reply.send({ success: false, message: 'Not Logged in' });
  }

  request.userId = userId;
};

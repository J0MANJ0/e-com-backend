import Clerk from '@clerk/fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import type { CustomJwtSessionClaims } from '@repo/types';

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
    return reply.status(401).send({ success: false, message: 'Not Logged in' });
  }

  request.userId = userId;
};

export const protectAdminAuth = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId, sessionClaims } = Clerk.getAuth(request);

  if (!userId) {
    return reply.status(401).send({
      success: false,
      message: 'Not logged in',
    });
  }

  const claims = sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== 'admin') {
    return reply.status(403).send({ success: false, message: 'Unauthorized' });
  }

  request.userId = userId;
};

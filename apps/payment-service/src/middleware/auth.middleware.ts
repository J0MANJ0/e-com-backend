import { getAuth } from '@hono/clerk-auth';
import { createMiddleware } from 'hono/factory';
import type { CustomJwtSessionClaims } from '@repo/types';

export const protectAuth = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: 'You are not logged in.',
    });
  }

  c.set('userId', auth.userId);
  next();
});

export const protectAdminAuth = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: 'You are not logged in.',
    });
  }

  const claims = auth?.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== 'admin') {
    return c.json({ success: false, message: 'Unauthorized' });
  }

  c.set('userId', auth.userId);
  next();
});

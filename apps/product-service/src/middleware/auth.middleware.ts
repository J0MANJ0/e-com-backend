import { getAuth } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';
import type { CustomJwtSessionClaims } from '@repo/types';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protectAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const { userId } = auth;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Not Logged in',
    });
  }

  req.userId = userId;

  next();
};

export const protectAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const { userId, sessionClaims } = auth;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Not Logged in',
    });
  }

  const claims = sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== 'admin') {
    return res.status(403).send({ success: false, message: 'Unauthorized' });
  }

  req.userId = userId;

  next();
};

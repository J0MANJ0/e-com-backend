import { getAuth } from '@clerk/express';
import { NextFunction, Request, Response } from 'express';

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

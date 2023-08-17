/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '../exceptions/api-error.js';
import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: ApiError, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Unexpected error' });
}
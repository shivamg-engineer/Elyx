import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Auth Middleware Running ');
    
    // Example check (dummy validation)
    const isAuthenticated = true;

    if (!isAuthenticated) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

   const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Extract token only
  console.log('Auth Header Received:', token);

  if (token !== 'mysecrettoken') {
    return res.status(401).json({ message: 'Invalid token' });
  }else{
    return res.status(200).json({ message: 'validated token' });
  }


    next(); // Allow request to proceed
  }
}

// src/middleware/token-verification.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenVerificationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Decoded en:", authHeader);
      throw new UnauthorizedException('Token is missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Replace 'your-secret-key' with your actual JWT secret key
      const decoded = jwt.verify(token, 'ATTENDANCE');
      console.log("Decoded token:", decoded);
      req['user'] = decoded; // Attach user data to the request for further use
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

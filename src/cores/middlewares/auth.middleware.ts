import { NextFunction, Response } from 'express'

import { routePrinting } from '@cores/helpers'
import { AuthLibraryService } from '@libs/auth'
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(private readonly authService: AuthLibraryService) {}

  use(req: any, res: Response, next: NextFunction): void {
    try {
      routePrinting(req.method, req.originalUrl)
      const bearerToken = req.headers.authorization
      const token = this.authService.verifyToken(bearerToken)
      const payload = this.authService.decodeToken(token)
      if (!payload) {
        throw new HttpException('User is not found', HttpStatus.UNAUTHORIZED)
      }
      req.payload = payload
      next()
    } catch (e) {
      if (e.status === HttpStatus.FORBIDDEN) {
        throw new HttpException(e.message, e.status)
      } else {
        throw new HttpException('User is not found', HttpStatus.UNAUTHORIZED)
      }
    }
  }
}

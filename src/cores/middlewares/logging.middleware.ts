import { NestMiddleware, Injectable } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { AuthLibraryService } from '@libs/auth'
import { routePrinting } from '@cores/helpers'

@Injectable()
export class LoggingMiddleWare implements NestMiddleware {
  constructor(private readonly authService: AuthLibraryService) {}
  use(req: any, res: Response, next: NextFunction): void {
    routePrinting(req.method, req.originalUrl)
    next()
  }
}

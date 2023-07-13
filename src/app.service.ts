import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getTz(): string {
    return process.env.TZ
  }
}

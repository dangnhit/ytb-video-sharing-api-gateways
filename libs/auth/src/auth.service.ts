import { User } from '@cores/entities'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface IAuthPayload {
  userId: string
  email: string
}

@Injectable()
export class AuthLibraryService {
  authPayload: IAuthPayload

  constructor(private jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload: IAuthPayload = {
      userId: user.id,
      email: user.email,
    }

    return this.jwtService.sign(payload)
  }

  verifyToken(bearerToken: string): string {
    if (!bearerToken) {
      throw new HttpException('Token is invalid', HttpStatus.FORBIDDEN)
    }

    const token = bearerToken.split(',')[0].split(' ')[1]
    const verified = this.jwtService.verify(token)
    if (!verified) {
      throw new HttpException('Token is invalid', HttpStatus.FORBIDDEN)
    }

    return token
  }

  decodeToken(token: string): IAuthPayload {
    const decoded = this.jwtService.decode(token) as IAuthPayload
    this.authPayload = decoded
    return decoded
  }

  getAuthPayload(): IAuthPayload {
    return this.authPayload
  }
}

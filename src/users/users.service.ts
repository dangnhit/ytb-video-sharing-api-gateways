import { verify } from 'password-hash'
import { Repository } from 'typeorm'

import { AuthenticateUserDto } from '@cores/dtos/users'
import { User } from '@cores/entities'
import { IAuth, IResponse } from '@cores/interfaces'
import { AuthLibraryService } from '@libs/auth'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authLibraryService: AuthLibraryService,
  ) {}

  async authenticate({ email, password }: AuthenticateUserDto): Promise<IResponse<IAuth>> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    })

    if (user) {
      if (verify(password, user.password)) {
        return await this.login(user)
      } else {
        throw new HttpException('Your password is wrong', HttpStatus.BAD_REQUEST)
      }
    } else {
      const newUser = new User()
      newUser.email = email
      newUser.password = newUser.generatePasswordHash(password)
      newUser.createdAt = newUser.generateDateNow()

      const res = await this.userRepository.save(newUser)
      return await this.login(res)
    }
  }

  private async login(user: User): Promise<IResponse<IAuth>> {
    const accessToken = await this.authLibraryService.generateToken(user)

    return {
      success: true,
      message: 'Login successfully',
      data: {
        userId: user.id,
        email: user.email,
        accessToken,
      },
    }
  }
}

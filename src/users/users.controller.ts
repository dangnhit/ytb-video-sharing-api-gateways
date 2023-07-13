import { AuthenticateUserDto } from '@cores/dtos/users'
import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { UsersService } from './users.service'

@ApiBearerAuth('defaultBearerAuth')
@ApiTags()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('authenticate')
  async authenticate(@Body() dto: AuthenticateUserDto) {
    return await this.usersService.authenticate(dto)
  }
}

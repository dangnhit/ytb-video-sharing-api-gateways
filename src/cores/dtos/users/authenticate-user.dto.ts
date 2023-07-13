import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthenticateUserDto {
  @ApiProperty({
    default: 'test@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    default: '123123123',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}

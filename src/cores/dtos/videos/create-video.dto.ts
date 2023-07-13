import { IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateVideoDto {
  @ApiProperty({
    default: 'https://www.youtube.com/watch?v=iTek_3FR7qw',
  })
  @IsString()
  @IsNotEmpty()
  url: string
}

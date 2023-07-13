import { IsNotEmpty, IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class PaginationQueryDto {
  @ApiProperty({
    default: '10',
    name: 'limit',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  limit: string

  @ApiProperty({
    default: '1',
    name: 'currentPage',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  currentPage: string
}

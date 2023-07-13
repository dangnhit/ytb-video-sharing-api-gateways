import { Column, Entity } from 'typeorm'

import { BaseEntity } from './base.entity'
import { IsEmail, IsString, Min } from 'class-validator'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsString()
  @IsEmail()
  email: string

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @Min(6)
  password: string
}

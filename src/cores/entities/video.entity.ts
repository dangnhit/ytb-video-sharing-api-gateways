import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from './base.entity'
import { IsString } from 'class-validator'
import { User } from './user.entity'

@Entity({ name: 'videos' })
export class Video extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  title: string

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  description?: string

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  vid: string

  @Column({ type: 'varchar', nullable: true, default: 0 })
  @IsString()
  likeCount: string

  @Column({ type: 'varchar', nullable: true, default: 0 })
  @IsString()
  dislikeCount: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  sharedBy: User
}

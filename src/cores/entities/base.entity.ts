import { generate, verify } from 'password-hash'
import { BaseEntity as TypeOrmBaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { v4 } from 'uuid'

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ type: 'boolean', nullable: false, default: true }) isActive: boolean
  @Column({ type: 'timestamptz', nullable: false }) createdAt: Date
  @Column({ type: 'timestamptz', nullable: true }) updatedAt?: Date

  generateUUID(): string {
    return v4()
  }

  generateDateNow(): Date {
    return new Date()
  }

  generatePasswordHash(password: string): string {
    return generate(password)
  }

  verifyPassword(password: string, hashedPassword: string): boolean {
    return verify(password, hashedPassword)
  }

  toJSON(): any {
    if (this['password'] !== undefined) this['password'] = undefined
    return this
  }

  removePassword(): any {
    if (this['password']) this['password'] = undefined
    return this
  }
}

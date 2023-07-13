import { User, Video } from '@cores/entities'
import { ConfigLibraryModule } from '@libs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigLibraryModule,
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Video],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class TypeOrmLibraryModule {}

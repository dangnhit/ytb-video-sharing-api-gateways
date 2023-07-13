import { User, Video } from '@cores/entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WsModule } from '@ws/ws'

import { VideosController } from './videos.controller'
import { VideosService } from './videos.service'

@Module({
  imports: [TypeOrmModule.forFeature([Video, User]), WsModule],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}

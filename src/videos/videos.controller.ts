import { PaginationQueryDto } from '@cores/dtos/pagination'
import { CreateVideoDto } from '@cores/dtos/videos'
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { VideosService } from './videos.service'

@ApiBearerAuth('defaultBearerAuth')
@ApiTags()
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async add(@Req() req: any, @Body() dto: CreateVideoDto) {
    const userId = req.payload?.userId
    return await this.videosService.add(dto, userId)
  }

  @Get()
  async paginate(@Query() dto: PaginationQueryDto) {
    return await this.videosService.getList(dto)
  }
}

import { google } from 'googleapis'
import { Repository } from 'typeorm'

import { WsConstants } from '@cores/constants'
import { PaginationQueryDto } from '@cores/dtos/pagination'
import { CreateVideoDto } from '@cores/dtos/videos'
import { User, Video } from '@cores/entities'
import { paginate } from '@cores/helpers'
import { IResponse, IResponseList } from '@cores/interfaces'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { WsService } from '@ws/ws'

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private readonly videoRepository: Repository<Video>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly wsService: WsService,
  ) {}

  async add(dto: CreateVideoDto, userId: string): Promise<IResponse<Video>> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) {
      return {
        success: false,
        message: 'User is not found',
      }
    }

    const videoId = dto.url.split('=')[1]

    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    })

    const response = await youtube.videos.list({ part: ['snippet', 'statistics'], id: [videoId] })

    const video = new Video()
    video.vid = videoId
    video.title = response.data.items[0].snippet.title
    video.description = response.data.items[0].snippet.description
    video.likeCount = response.data.items[0].statistics.likeCount
    video.dislikeCount = response.data.items[0].statistics.dislikeCount
    video.createdAt = video.generateDateNow()
    video.sharedBy = user

    const data = await this.videoRepository.save(video)

    this.wsService.server.emit(WsConstants.VIDEO_ADDED, data)

    return {
      success: true,
      message: 'Created video successfully',
      data,
    }
  }

  async getList(dto: PaginationQueryDto): Promise<IResponseList<Video>> {
    const queryBuilder = this.videoRepository.createQueryBuilder('video').leftJoinAndSelect('video.sharedBy', 'sharedBy')
    queryBuilder.orderBy('video.createdAt', 'DESC')

    const res = await paginate<Video>(queryBuilder, { limit: dto.limit, page: dto.currentPage })

    if (!res.success) {
      return {
        success: false,
        message: 'Something went wrong',
      }
    }

    return {
      success: true,
      data: res.data,
    }
  }
}

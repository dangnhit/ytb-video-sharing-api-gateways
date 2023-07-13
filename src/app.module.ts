import { startUpPrinting } from '@cores/helpers'
import { AuthMiddleWare } from '@cores/middlewares'
import { AuthLibraryModule } from '@libs/auth'
import { TypeOrmLibraryModule } from '@libs/typeorm'
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { VideosModule } from './videos/videos.module'

@Module({
  imports: [
    // THROTTLER
    ThrottlerModule.forRoot({
      ttl: 6000,
      limit: 1000,
    }),
    TypeOrmLibraryModule,
    AuthLibraryModule,
    UsersModule,
    VideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleWare)
      .exclude({ path: 'users/authenticate', method: RequestMethod.POST }, { path: 'videos', method: RequestMethod.GET })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }

  onApplicationBootstrap(): void {
    startUpPrinting('VIDEO YOUTUBE SHARING APP', +process.env.PORT || 5001)
  }
}

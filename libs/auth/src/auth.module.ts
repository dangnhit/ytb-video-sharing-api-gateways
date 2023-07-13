import { Global, Module } from '@nestjs/common'
import { AuthLibraryService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '31556926s' },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthLibraryService],
  exports: [AuthLibraryService],
})
export class AuthLibraryModule {}

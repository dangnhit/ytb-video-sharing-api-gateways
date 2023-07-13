import { getEnvPath } from '@cores/helpers'
import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

const envFilePath: string = getEnvPath(`${process.cwd()}/src/cores/environments`)

@Module({
  imports: [NestConfigModule.forRoot({ envFilePath, isGlobal: true })],
})
export class ConfigLibraryModule {}

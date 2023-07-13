import { NestFactory } from '@nestjs/core'
import setTz from 'set-tz'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap(): Promise<void> {
  try {
    setTz(process.env.DEFAULT_TZ)
  } catch (error) {
    console.log('SET-TZ ERROR TYPE')
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const extractor = (request: Request): string | string[] =>
    [request.headers['api-version'] ?? '']
      .flatMap((v: string) => v.split(','))
      .filter(v => !!v)
      .sort()
      .reverse()

  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, OPTIONS',
    preflightContinue: false,
    credentials: true,
  })

  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.setGlobalPrefix('api')

  const apiOptions = new DocumentBuilder()
    .setTitle('Youtube Video Sharing API System')
    .setDescription('APP API')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build()

  const document = SwaggerModule.createDocument(app, apiOptions)
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: process.env.SWAGGER_TOKEN,
        },
      },
    },
  })

  const port = process.env.PORT || 5001
  await app.listen(port)
}
bootstrap()

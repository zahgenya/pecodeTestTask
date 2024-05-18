import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json(getBodyParserOptions(true, { limit: '20mb' })));
  await app.listen(3000); // config file later
}
bootstrap();

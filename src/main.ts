import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import  * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT;

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(PORT, () =>
    console.log(`Server is running on 127.0.0.1:${PORT}`),
  );
}
bootstrap();

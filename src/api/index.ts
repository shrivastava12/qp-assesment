import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ApiModule } from './ApiModule';
import { sequilize } from '../models';
import { TransactionalInterceptor } from '../common';

export async function bootstrap(expressApp): Promise<INestApplication> {
  const app = await NestFactory.create(
    ApiModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    allowedHeaders: ['authorization', 'content-type', 'accept'],
    exposedHeaders: ['Content-Disposition', 'Content-Type'],
  });
  const globalPrefix = process.env.API_PREFIX;
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransactionalInterceptor(sequilize));

  // Test the connection
  await sequilize.validate();
 // await sequilize.sync();
  return app;
}

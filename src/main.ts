import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const tcpConfig = config.get('microservices.tcp');
  const redisConfig = config.get('microservices.redis');
  const port = config.get('server.port');

  app.connectMicroservice(tcpConfig);
  app.connectMicroservice(redisConfig);

  await app.startAllMicroservices();
  await app.listen(port);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap();

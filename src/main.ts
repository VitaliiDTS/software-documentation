import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.getHttpAdapter().get('/', (req: any, res: any) => res.redirect('/issues'));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application running at http://localhost:${port}/issues`);
}

bootstrap();

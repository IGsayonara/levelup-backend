import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'http://luckyigor.world',
      'http://dev.luckyigor.world',
    ],
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Levelup Api')
    .setDescription('The cats leveleup description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

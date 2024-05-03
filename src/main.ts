import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors();

  // Amplia el tamaño que se recibe en el BOSY, sin esto peticiones grandes dan error 413 (Payload Too Large) 
  app.use(json({ limit: '50mb' }));

  // Agrega validadores para los DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );


  const port = process.env.PORT || 3000;
  
  await app.listen(port);
}
bootstrap();

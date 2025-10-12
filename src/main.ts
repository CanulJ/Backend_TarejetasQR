import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Esto permite cualquier origen (Angular local o deployado)
  app.enableCors({
    origin: true, 
    credentials: true,
  });

  // Puerto dinámico que Koyeb te asigna
  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`API corriendo en puerto ${port}`);
}

bootstrap();

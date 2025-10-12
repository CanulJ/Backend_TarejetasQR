import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para cualquier origen (puedes restringirlo después)
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Usa el puerto que Koyeb asigna
  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`API corriendo en puerto ${port}`);
}
bootstrap();

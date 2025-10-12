import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:4200',          // Front local
    'https://qrtests.netlify.app',    // Front desplegado
  ];

  let corsOptions: CorsOptions;

  if (process.env.NODE_ENV === 'production') {
    // Configuración CORS para producción
    corsOptions = {
      origin: (origin, callback) => {
        // Permite requests sin origin (Postman, curl, etc)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.warn(`Intento de acceso CORS desde origen no permitido: ${origin}`);
          callback(new Error('Origen no permitido por CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    };
  } else {
    // Configuración CORS para desarrollo
    corsOptions = {
      origin: '*', // acepta todo
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    };
  }

  app.enableCors(corsOptions);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Servidor corriendo en puerto ${port}`);
}

bootstrap();

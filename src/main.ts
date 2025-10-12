import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:4200',           // desarrollo local
    'https://tu-frontend.koyeb.app',  // frontend desplegado
  ];

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // solicitudes sin origen (Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  // PASA corsOptions AQUÍ
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API corriendo en puerto ${process.env.PORT ?? 3000}`);
}

bootstrap();

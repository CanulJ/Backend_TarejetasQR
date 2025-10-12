import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // URLs permitidas
  const allowedOrigins = [
    'http://localhost:4200',          // Angular en local
    'https://tu-frontend.koyeb.app', // frontend desplegado
  ];

  // Configuración de CORS
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // solicitudes sin origen (Postman o llamadas internas) pasan
      if (!origin) return callback(null, true);

      // si el origen está en la lista, pasa
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // permite cookies y auth headers
  };

  // Habilita CORS con la configuración
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API corriendo en puerto ${process.env.PORT ?? 3000}`);
}

bootstrap();

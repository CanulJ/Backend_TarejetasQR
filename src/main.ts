import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  // Crear la aplicación Nest
  const app = await NestFactory.create(AppModule);

  // Lista de orígenes permitidos
  const allowedOrigins = [
    'http://localhost:4200',           // tu front local
    'https://qrtests.netlify.app',     // tu front desplegado
  ];

  // Configuración de CORS
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Permite requests directas sin origin (Postman, curl, etc)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  // Activar CORS con la configuración
  app.enableCors(corsOptions);

  // Escuchar en el puerto de environment o 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Servidor corriendo en puerto ${process.env.PORT ?? 3000}`);
}

bootstrap();

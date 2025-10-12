import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // URLs permitidas
  const allowedOrigins = [
    'http://localhost:4200',           // desarrollo local
    'https://tu-frontend.koyeb.app',  // frontend desplegado
  ];

  // Configuración de CORS
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Permite solicitudes sin origen (por ejemplo, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // origen permitido
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  await app.listen(process.env.PORT ?? 3000);
  console.log(`API corriendo en puerto ${process.env.PORT ?? 3000}`);
}

bootstrap();

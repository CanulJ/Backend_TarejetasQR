import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lista de orígenes permitidos
  const allowedOrigins = [
    'http://localhost:4200',           // Angular local
    'http://127.0.0.1:4200',           // por si usas 127.0.0.1
    'https://tu-frontend.koyeb.app',  // frontend desplegado
  ];

  // Configuración de CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Solicitudes sin origen (Postman, curl) pasan
      if (!origin) return callback(null, true);

      // Si el origen está en la lista, permitir
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // permite cookies y headers de auth
  });

  // Puerto dinámico (Koyeb u otro hosting) o 3000 local
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  console.log(`API corriendo en puerto ${port}`);
}

bootstrap();

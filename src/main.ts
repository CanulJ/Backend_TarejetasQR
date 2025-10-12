import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:4200',
  ];

  // Configuración de CORS
  const corsOptions: CorsOptions =
    process.env.NODE_ENV === 'production'
      ? {
          origin: (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void,
          ) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error('Origen no permitido por CORS'));
            }
          },
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true,
        }
      : {
          origin: '*', // en dev acepta todo
        };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

 // Intento de subida a git
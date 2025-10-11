import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuarios } from './usuarios/usuarios.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-us-east-2.pooler.supabase.com',
      port: 5432,
      username: 'postgres.vsunqxpipbilirfztfib',
      password: 'Rosendo1_',
      database: 'postgres',
      entities: [Usuarios],
      synchronize: false,
    }), UsuariosModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

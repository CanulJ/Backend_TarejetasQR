import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos y entidades
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuarios } from './usuarios/usuarios.entity';
import { DatosMedicosModule } from './datosmedicos/datosmedicos.module';
import { DatosMedicos } from './datosmedicos/datosmedicos.entity';
import { HistoriaClinica } from './historiaclinica/historiaclinica.entity';
import { Antecedentes } from './antecedentes/antecedentes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-us-east-2.pooler.supabase.com',
      port: 5432,
      username: 'postgres.vsunqxpipbilirfztfib',
      password: 'Rosendo1_',
      database: 'postgres',
      entities: [Usuarios, DatosMedicos, HistoriaClinica, Antecedentes], // ✅ Ambas entidades registradas
      synchronize: false, // Mantener false en producción
    }),

    // ✅ Módulos principales
    UsuariosModule,
    DatosMedicosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

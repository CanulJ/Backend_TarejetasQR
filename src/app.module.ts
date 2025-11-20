import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🧩 Entidades y módulos existentes
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuarios } from './usuarios/usuarios.entity';
import { DatosMedicosModule } from './datosmedicos/datosmedicos.module';
import { DatosMedicos } from './datosmedicos/datosmedicos.entity';
import { HistoriaClinica } from './historiaclinica/historiaclinica.entity';
import { Antecedentes } from './antecedentes/antecedentes.entity';
import { HistoriaClinicaModule } from './historiaclinica/historiaclinica.module';
import { AntecedentesModule } from './antecedentes/antecedentes.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { Medicamentos } from './medicamentos/medicamentos.entity';
import { SeguroMedicoModule } from './seguromedico/seguromedico.module';
import { SeguroMedico } from './seguromedico/seguromedico.entity';
import { QRCodigosModule } from './qrcodigos/qrcodigos.module';
import { QRCodigos } from './qrcodigos/qrcodigos.entity';

// 🆕 Nueva entidad y módulo
import { SolicitudesTarjetaModule } from './solicitudes-tarjeta/solicitudes-tarjeta.module';
import { SolicitudesTarjeta } from './solicitudes-tarjeta/solicitudes-tarjeta.entity';
import { EnviarEmailModule } from './enviar-email/enviar-email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-us-east-2.pooler.supabase.com',
      port: 5432,
      username: 'postgres.vsunqxpipbilirfztfib',
      password: 'Rosendo1_',
      database: 'postgres',
      entities: [
        Usuarios,
        DatosMedicos,
        HistoriaClinica,
        Antecedentes,
        Medicamentos,
        SeguroMedico,
        QRCodigos,
        SolicitudesTarjeta, // ✅ Nueva entidad registrada aquí
      ],
      synchronize: false, // Mantén false para no romper tablas
    }),

    // ✅ Módulos principales
    UsuariosModule,
    DatosMedicosModule,
    HistoriaClinicaModule,
    AntecedentesModule,
    MedicamentosModule,
    SeguroMedicoModule,
    QRCodigosModule,
    SolicitudesTarjetaModule,
    EnviarEmailModule, // ✅ Nuevo módulo integrado
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

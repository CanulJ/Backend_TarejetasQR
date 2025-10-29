import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos y entidades existentes
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuarios } from './usuarios/usuarios.entity';
import { DatosMedicosModule } from './datosmedicos/datosmedicos.module';
import { DatosMedicos } from './datosmedicos/datosmedicos.entity';
import { HistoriaClinica } from './historiaclinica/historiaclinica.entity';
import { Antecedentes } from './antecedentes/antecedentes.entity';
import { HistoriaClinicaModule } from './historiaclinica/historiaclinica.module';
import { AntecedentesModule } from './antecedentes/antecedentes.module';

// 🧩 Nuevos módulos y entidades
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { Medicamentos } from './medicamentos/medicamentos.entity';
import { SeguroMedicoModule } from './seguromedico/seguromedico.module';
import { SeguroMedico } from './seguromedico/seguromedico.entity';

// 🧩 NUEVO módulo y entidad de QRCodigos
import { QRCodigosModule } from './qrcodigos/qrcodigos.module';
import { QRCodigos } from './qrcodigos/qrcodigos.entity';

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
        QRCodigos, // ✅ Agregada la entidad QRCodigos
      ],
      synchronize: false, // Mantener false en producción
    }),

    // ✅ Módulos principales
    UsuariosModule,
    DatosMedicosModule,
    HistoriaClinicaModule,
    AntecedentesModule,
    MedicamentosModule,
    SeguroMedicoModule,
    QRCodigosModule, // ✅ Agregado el módulo QRCodigos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

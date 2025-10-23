import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicamentos } from './medicamentos.entity';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medicamentos])],
  controllers: [MedicamentosController],
  providers: [MedicamentosService],
  exports: [MedicamentosService],
})
export class MedicamentosModule {}

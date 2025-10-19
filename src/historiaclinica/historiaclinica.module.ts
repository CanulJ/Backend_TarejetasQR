import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaClinica } from './historiaclinica.entity';
import { HistoriaClinicaService } from './historiaclinica.service';
import { HistoriaClinicaController } from './historiaclinica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistoriaClinica])],
  controllers: [HistoriaClinicaController],
  providers: [HistoriaClinicaService],
  exports: [HistoriaClinicaService],
})
export class HistoriaClinicaModule {}

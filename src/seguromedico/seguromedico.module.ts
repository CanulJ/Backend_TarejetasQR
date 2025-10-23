import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeguroMedico } from './seguromedico.entity';
import { SeguroMedicoService } from './seguromedico.service';
import { SeguroMedicoController } from './seguromedico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SeguroMedico])],
  controllers: [SeguroMedicoController],
  providers: [SeguroMedicoService],
  exports: [SeguroMedicoService],
})
export class SeguroMedicoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Antecedentes } from './antecedentes.entity';
import { AntecedentesService } from './antecedentes.service';
import { AntecedentesController } from './antecedentes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Antecedentes])],
  controllers: [AntecedentesController],
  providers: [AntecedentesService],
  exports: [AntecedentesService],
})
export class AntecedentesModule {}

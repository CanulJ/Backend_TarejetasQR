import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosMedicos } from './datosmedicos.entity';
import { DatosMedicosService } from './datosmedicos.service';
import { DatosMedicosController } from './datosmedicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DatosMedicos])],
  controllers: [DatosMedicosController],
  providers: [DatosMedicosService],
})
export class DatosMedicosModule {}

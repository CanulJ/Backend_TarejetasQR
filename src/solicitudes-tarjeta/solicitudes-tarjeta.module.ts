import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesTarjetaService } from './solicitudes-tarjeta.service';
import { SolicitudesTarjetaController } from './solicitudes-tarjeta.controller';
import { SolicitudesTarjeta } from './solicitudes-tarjeta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudesTarjeta])],
  controllers: [SolicitudesTarjetaController],
  providers: [SolicitudesTarjetaService],
  exports: [SolicitudesTarjetaService],
})
export class SolicitudesTarjetaModule {}

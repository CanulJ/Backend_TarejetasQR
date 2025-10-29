import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCodigos } from './qrcodigos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';
import { QRCodigosService } from './qrcodigos.service';
import { QRCodigosController } from './qrcodigos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QRCodigos, Usuarios])],
  controllers: [QRCodigosController],
  providers: [QRCodigosService],
  exports: [QRCodigosService],
})
export class QRCodigosModule {}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QRCodigosService } from './qrcodigos.service';
import { QRCodigos } from './qrcodigos.entity';

@Controller('qrcodigos')
export class QRCodigosController {
  constructor(private readonly qrService: QRCodigosService) {}

  @Get()
  findAll(): Promise<QRCodigos[]> {
    return this.qrService.findAll();
  }

  @Get('token/:token')
  async findByToken(@Param('token') token: string): Promise<QRCodigos> {
    const qr = await this.qrService.findByToken(token);
    if (!qr) throw new HttpException('Token no encontrado', HttpStatus.NOT_FOUND);
    return qr;
  }

  @Get('nfc/:uid')
  async findByNFC(@Param('uid') uid: string): Promise<QRCodigos> {
    const qr = await this.qrService.findByNFC(uid);
    if (!qr) throw new HttpException('Tarjeta NFC no registrada', HttpStatus.NOT_FOUND);
    return qr;
  }

  @Get('usuario/:userid')
  async findByUser(@Param('userid') userid: number): Promise<QRCodigos[]> {
    return this.qrService.findByUser(userid);
  }

  @Get(':idqr')
  async findOne(@Param('idqr') idqr: number): Promise<QRCodigos> {
    return this.qrService.findOne(idqr);
  }

  @Post()
  async create(
    @Body()
    data: { userid: number; urlqrcode: string; nfc_uid?: string; estado?: string },
  ): Promise<QRCodigos> {
    try {
      return await this.qrService.create(data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear el código QR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':idqr')
  async update(
    @Param('idqr') idqr: number,
    @Body() data: Partial<QRCodigos>,
  ): Promise<QRCodigos> {
    try {
      return await this.qrService.update(idqr, data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar código QR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':idqr')
  async remove(@Param('idqr') idqr: number): Promise<{ deleted: boolean }> {
    try {
      return await this.qrService.remove(idqr);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar código QR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

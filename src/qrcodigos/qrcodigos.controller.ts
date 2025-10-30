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

  // 📦 Obtener todos los QR
  @Get()
  findAll(): Promise<QRCodigos[]> {
    return this.qrService.findAll();
  }

  // 🔐 Validar acceso por TOKEN y UID NFC
@Get('validar-nfc/:token/:uid')
async validarPorTokenYUID(
  @Param('token') token: string,
  @Param('uid') uid: string
): Promise<QRCodigos> {
  const qr = await this.qrService.findByTokenAndUID(token, uid);

  if (!qr) {
    throw new HttpException(
      'Acceso denegado: token o UID inválido',
      HttpStatus.FORBIDDEN,
    );
  }

  return qr;
}

  // 🔍 Buscar por token (para acceso vía URL)
  @Get('token/:token')
  async findByToken(@Param('token') token: string): Promise<QRCodigos> {
    const qr = await this.qrService.findByToken(token);
    if (!qr) throw new HttpException('Token no encontrado', HttpStatus.NOT_FOUND);
    return qr;
  }

  // 🧠 Buscar por UID NFC (para lectura directa de tarjeta)
  @Get('verificar-nfc/:uid')
  async findByNfcUid(@Param('uid') uid: string): Promise<any> {
    const qr = await this.qrService.findByNfcUid(uid);
    if (!qr)
      throw new HttpException('Tarjeta NFC no registrada o inactiva', HttpStatus.NOT_FOUND);

    // Devuelve solo lo necesario, por seguridad
    return {
      valido: true,
      token: qr.urlqrcode,
      usuario: {
        id: qr.usuario.id,
        nombre: qr.usuario.nombre,
        correo: qr.usuario.correo,
      },
    };
  }

  // 📂 Buscar por usuario
  @Get('usuario/:userid')
  async findByUser(@Param('userid') userid: number): Promise<QRCodigos[]> {
    return this.qrService.findByUser(userid);
  }

  // 📋 Buscar por ID del QR
  @Get(':idqr')
  async findOne(@Param('idqr') idqr: number): Promise<QRCodigos> {
    return this.qrService.findOne(idqr);
  }

  // 🧩 Crear nuevo QR (agrega nfc_uid si viene del frontend)
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

  // 🛠️ Actualizar QR
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

  // 🗑️ Eliminar QR
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

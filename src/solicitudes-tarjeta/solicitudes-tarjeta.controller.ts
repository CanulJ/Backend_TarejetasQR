import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SolicitudesTarjetaService } from './solicitudes-tarjeta.service';
import { SolicitudesTarjeta } from './solicitudes-tarjeta.entity';

@Controller('solicitudes-tarjeta')
export class SolicitudesTarjetaController {
  constructor(private readonly solicitudService: SolicitudesTarjetaService) {}

  // 🔹 Crear nueva solicitud
  @Post()
  async crearSolicitud(@Body() data: Partial<SolicitudesTarjeta>) {
    return this.solicitudService.crearSolicitud(data);
  }

  // 🔹 Obtener todas las solicitudes
  @Get()
  async obtenerSolicitudes() {
    return this.solicitudService.obtenerSolicitudes();
  }

  // 🔹 Obtener solicitudes por usuario
  @Get('usuario/:userId')
  async obtenerPorUsuario(@Param('userId') userId: number) {
    return this.solicitudService.obtenerPorUsuario(userId);
  }

  // 🔹 Actualizar solicitud (estado, token, QR, etc.)
  @Put(':idSolicitud')
  async actualizarSolicitud(
    @Param('idSolicitud') idSolicitud: number,
    @Body() data: Partial<SolicitudesTarjeta>
  ) {
    return this.solicitudService.actualizarSolicitud(idSolicitud, data);
  }

  // 🔹 Eliminar solicitud
  @Delete(':idSolicitud')
  async eliminarSolicitud(@Param('idSolicitud') idSolicitud: number) {
    await this.solicitudService.eliminarSolicitud(idSolicitud);
    return { mensaje: 'Solicitud eliminada correctamente' };
  }
}

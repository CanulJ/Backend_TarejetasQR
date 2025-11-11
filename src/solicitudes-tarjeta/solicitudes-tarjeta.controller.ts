import { Controller, Get, Post, Patch, Delete, Param, Body, Put } from '@nestjs/common';
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

  // 🔹 Obtener todas las solicitudes (para el panel del admin)
  @Get()
  async obtenerSolicitudes() {
    return this.solicitudService.obtenerSolicitudes();
  }

  // 🔹 Obtener solicitudes por usuario
  @Get('usuario/:userId')
  async obtenerPorUsuario(@Param('userId') userId: number) {
    return this.solicitudService.obtenerPorUsuario(userId);
  }

  // 🔹 Actualizar estado (por ejemplo, aprobar o rechazar solicitud)
  @Patch(':idSolicitud/estado')
  async actualizarEstado(
    @Param('idSolicitud') idSolicitud: number,
    @Body('estado') estado: string,
  ) {
    return this.solicitudService.actualizarEstado(idSolicitud, estado);
  }

  @Put(':idSolicitud')
async actualizarSolicitud(
  @Param('idSolicitud') idSolicitud: number,
  @Body() data: Partial<SolicitudesTarjeta>
) {
  return this.solicitudService.actualizarSolicitud(idSolicitud, data);
}


  // 🔹 Eliminar una solicitud (si se requiere)
  @Delete(':idSolicitud')
  async eliminarSolicitud(@Param('idSolicitud') idSolicitud: number) {
    await this.solicitudService.eliminarSolicitud(idSolicitud);
    return { mensaje: 'Solicitud eliminada correctamente' };
  }
}

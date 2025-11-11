import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudesTarjeta } from './solicitudes-tarjeta.entity';

@Injectable()
export class SolicitudesTarjetaService {
  constructor(
    @InjectRepository(SolicitudesTarjeta)
    private readonly solicitudRepo: Repository<SolicitudesTarjeta>,
  ) {}

  // 🔹 Crear nueva solicitud
  async crearSolicitud(data: Partial<SolicitudesTarjeta>): Promise<SolicitudesTarjeta> {
    const nuevaSolicitud = this.solicitudRepo.create({
      ...data,
      fecha_Solicitud: new Date(), // Se asigna la fecha actual automáticamente
      estado: 'pendiente',
    });
    return this.solicitudRepo.save(nuevaSolicitud);
  }

  // 🔹 Obtener todas las solicitudes (para el panel de admin)
  async obtenerSolicitudes(): Promise<SolicitudesTarjeta[]> {
    return this.solicitudRepo.find({
      relations: ['usuario', 'qr'],
      order: { fecha_Solicitud: 'DESC' },
    });
  }

  // 🔹 Obtener solicitudes por usuario
  async obtenerPorUsuario(userId: number): Promise<SolicitudesTarjeta[]> {
    return this.solicitudRepo.find({
      where: { userId },
      relations: ['qr'],
      order: { fecha_Solicitud: 'DESC' },
    });
  }

  // 🔹 Actualizar estado (aprobar o rechazar solicitud)
  async actualizarEstado(idSolicitud: number, estado: string): Promise<SolicitudesTarjeta> {
    const solicitud = await this.solicitudRepo.findOne({ where: { idSolicitud } });
    if (!solicitud) throw new Error('Solicitud no encontrada');

    solicitud.estado = estado;
    solicitud.fecha_Revision = new Date();
    return this.solicitudRepo.save(solicitud);
  }

  // 🔹 Eliminar una solicitud
  async eliminarSolicitud(idSolicitud: number): Promise<void> {
    await this.solicitudRepo.delete(idSolicitud);
  }

  async actualizarSolicitud(id: number, data: Partial<SolicitudesTarjeta>) {
  const solicitud = await this.solicitudRepo.findOne({ where: { idSolicitud: id } });
  if (!solicitud) throw new Error('Solicitud no encontrada');
  Object.assign(solicitud, data);
  return this.solicitudRepo.save(solicitud);
}


}

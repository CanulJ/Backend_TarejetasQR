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
      fecha_Solicitud: new Date(),
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

  // 🔹 Actualizar estado y token/QR
  async actualizarSolicitud(id: number, data: Partial<SolicitudesTarjeta>): Promise<SolicitudesTarjeta> {
    const solicitud = await this.solicitudRepo.findOne({ where: { idSolicitud: id } });
    if (!solicitud) throw new Error('Solicitud no encontrada');

    // Si se aprueba y no tiene token, generamos uno
    if (data.estado === 'aprobada' && !solicitud.token) {
      solicitud.token = Math.random().toString(36).substring(2, 10);
      solicitud.fecha_Revision = new Date();
      // Si envían idQr en data, lo asignamos también
      if (data.idQr) solicitud.idQr = data.idQr;
    }

    // Si se aprueba aunque ya tenga token, permitimos actualizar idQr
    if (data.estado === 'aprobada' && data.idQr) {
      solicitud.idQr = data.idQr;
      solicitud.fecha_Revision = new Date();
    }

    // Si se rechaza, permitimos cambiar estado sin borrar token
    if (data.estado === 'rechazada') {
      solicitud.estado = 'rechazada';
      solicitud.fecha_Revision = new Date();
    }

    // Asignar cualquier otro campo enviado
    Object.assign(solicitud, { ...data });

    return this.solicitudRepo.save(solicitud);
  }

  // 🔹 Eliminar una solicitud
  async eliminarSolicitud(idSolicitud: number): Promise<void> {
    await this.solicitudRepo.delete(idSolicitud);
  }
}

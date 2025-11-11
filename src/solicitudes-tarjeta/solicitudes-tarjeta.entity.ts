import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';
import { QRCodigos } from 'src/qrcodigos/qrcodigos.entity';

@Entity('SolicitudTarjetas') // 👈 coincide con el nombre de la tabla en Supabase
export class SolicitudesTarjeta {
  @PrimaryGeneratedColumn({ name: 'idSolicitud' })
  idSolicitud: number;

  @ManyToOne(() => Usuarios, (usuario) => usuario.id)
  @JoinColumn({ name: 'userId' })
  usuario: Usuarios;

  @Column({ name: 'userId' })
  userId: number;

  @Column({ name: 'token', type: 'varchar', nullable: false })
  token: string;

  @Column({ name: 'estado', type: 'varchar', nullable: false, default: 'pendiente' })
  estado: string;

  @Column({ name: 'fecha_Solicitud', type: 'date', nullable: false })
  fecha_Solicitud: Date;

  @Column({ name: 'fecha_Revision', type: 'date', nullable: true })
  fecha_Revision?: Date;

  @ManyToOne(() => QRCodigos, (qr) => qr.idqr, { nullable: true })
  @JoinColumn({ name: 'idQr' })
  qr?: QRCodigos;

  @Column({ name: 'idQr', type: 'int', nullable: true })
  idQr?: number;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';

@Entity('QRCodigos')
export class QRCodigos {
  @PrimaryGeneratedColumn()
  idqr: number;

  @Column()
  userid: number;

  @Column()
  urlqrcode: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechacreacion: Date;

  @Column({ default: 'activo' })
  estado: string;

@Column({ nullable: true })
nfc_uid?: string; // ahora es opcional


  // Relación con Usuarios
  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'userid' })
  usuario: Usuarios;
}

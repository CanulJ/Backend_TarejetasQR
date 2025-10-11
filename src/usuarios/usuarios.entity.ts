import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  password_hash: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ default: true })
  isActive: boolean;
}

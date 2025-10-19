import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  password_hash: string;

  @Column({ type: 'date', nullable: true })
  fecha_creacion: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 18, unique: true })
  curp: string;

  @Column({ default: 'Activo' })
  estado: string;

  @Column({ nullable: true })
  rolid: number;

  @Column({ nullable: true })
  apellidos: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ type: 'date', nullable: true })
  fechanacimiento: Date;

  @Column({ nullable: true })
  genero: string;

  @Column({ nullable: true })
  originario: string;
}

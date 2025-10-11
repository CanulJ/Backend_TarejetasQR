import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column({ nullable: true })
  correo: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column()
  genero: string;

  @Column()
  contraseña: string;

  @Column()
  estado: boolean;

  @Column({ type: 'date' })
  fechaCreacion: Date;

  @Column()
  idRol: number;
}


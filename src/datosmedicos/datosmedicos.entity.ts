import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuarios } from '../usuarios/usuarios.entity';
import { HistoriaClinica } from '../historiaclinica/historiaclinica.entity';

@Entity('DatosMedicos')
export class DatosMedicos {
  @PrimaryGeneratedColumn()
  id_datos: number;

  @Column()
  id_usuario: number;

  @ManyToOne(() => Usuarios)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuarios;

  @Column({ nullable: true })
  tipo_sangre: string;

  @Column({ nullable: true })
  alergias: string;

  @Column({ nullable: true })
  medicamentos: string;

  @Column({ nullable: true })
  enfermedades: string;

  @Column({ nullable: true })
  contacto_emergencia: string;

  // Relación con HistoriaClinica
  @OneToMany(() => HistoriaClinica, (historia) => historia.datosMedicos, {
    cascade: true,
  })
  historiales: HistoriaClinica[];
}

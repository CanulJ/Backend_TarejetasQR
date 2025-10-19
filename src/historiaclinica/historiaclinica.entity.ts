import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DatosMedicos } from '../datosmedicos/datosmedicos.entity'; // Asegúrate de crear esta entidad principal más adelante

@Entity('HistoriaClinica')
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  idhistoria: number;

  @Column()
  datosmedicosid: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecharegistro: Date;

  // Relación con DatosMedicos (muchas historias pueden pertenecer a un mismo registro médico)
  @ManyToOne(() => DatosMedicos, (datosMedicos) => datosMedicos.historiales, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'datosmedicosid' })
  datosMedicos: DatosMedicos;
    antecedentes: any;
}

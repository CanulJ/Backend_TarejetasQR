import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('SeguroMedico')
export class SeguroMedico {
  @PrimaryGeneratedColumn()
  idseguro: number;

  @Column()
  datosmedicosid: number;

  @Column()
  tiposeguro: string;

  @Column()
  institucion: string;

  @Column()
  numeropoliza: string;

  @Column({ type: 'date' })
  vigencia: Date;
}

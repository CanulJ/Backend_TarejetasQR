import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('SeguroMedico')
export class SeguroMedico {
  @PrimaryGeneratedColumn()
  IdSeguro: number;

  @Column()
  DatosMedicosId: number;

  @Column()
  TipoSeguro: string;

  @Column()
  Institucion: string;

  @Column()
  NumeroPoliza: string;

  @Column({ type: 'date' })
  Vigencia: Date;
}

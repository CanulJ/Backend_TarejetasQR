import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HistoriaClinica } from '../historiaclinica/historiaclinica.entity';

@Entity('Antecedentes')
export class Antecedentes {
  @PrimaryGeneratedColumn()
  id_antecedente: number;

  @ManyToOne(() => HistoriaClinica, (historia) => historia.antecedentes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_historia' })
  historia: HistoriaClinica;

  @Column({ nullable: true })
  padre: string;

  @Column({ nullable: true })
  madre: string;

  @Column({ nullable: true })
  abuelos: string;

  @Column({ nullable: true })
  hermanos: string;

  @Column({ nullable: true })
  otros: string;
}

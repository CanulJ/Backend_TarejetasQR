import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Medicamentos')
export class Medicamentos {
  @PrimaryGeneratedColumn()
  IdMedicamento: number;

  @Column()
  DatosMedicosId: number;

  @Column()
  Nombre: string;

  @Column()
  Dosis: string;

  @Column()
  Frecuencia: string;
}

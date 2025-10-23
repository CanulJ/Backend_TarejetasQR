import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamentos } from './medicamentos.entity';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamentos)
    private readonly medicamentosRepository: Repository<Medicamentos>,
  ) {}

  async findAll(): Promise<Medicamentos[]> {
    return this.medicamentosRepository.find();
  }

  async findOne(id: number): Promise<Medicamentos> {
    const medicamento = await this.medicamentosRepository.findOne({ where: { IdMedicamento: id } });
    if (!medicamento) {
      throw new NotFoundException(`Medicamento con id ${id} no encontrado`);
    }
    return medicamento;
  }

  async create(data: Partial<Medicamentos>): Promise<Medicamentos> {
    if (!data.Nombre || !data.Dosis || !data.Frecuencia) {
      throw new BadRequestException('Nombre, Dosis y Frecuencia son obligatorios');
    }

    const nuevoMedicamento = this.medicamentosRepository.create({
      DatosMedicosId: data.DatosMedicosId,
      Nombre: data.Nombre,
      Dosis: data.Dosis,
      Frecuencia: data.Frecuencia,
    });

    return this.medicamentosRepository.save(nuevoMedicamento);
  }

  async update(id: number, data: Partial<Medicamentos>): Promise<Medicamentos> {
    const medicamento = await this.findOne(id);

    await this.medicamentosRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.medicamentosRepository.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Antecedentes } from './antecedentes.entity';

@Injectable()
export class AntecedentesService {
  constructor(
    @InjectRepository(Antecedentes)
    private readonly antecedentesRepository: Repository<Antecedentes>,
  ) {}

  async findAll(): Promise<Antecedentes[]> {
    return this.antecedentesRepository.find({ relations: ['historia'] });
  }

  async findOne(id: number): Promise<Antecedentes> {
    const antecedente = await this.antecedentesRepository.findOne({ where: { id_antecedente: id }, relations: ['historia'] });
    if (!antecedente) throw new NotFoundException(`Antecedente con ID ${id} no encontrado`);
    return antecedente;
  }

  async create(data: Partial<Antecedentes>): Promise<Antecedentes> {
    const nuevo = this.antecedentesRepository.create(data);
    return this.antecedentesRepository.save(nuevo);
  }

  async update(id: number, data: Partial<Antecedentes>): Promise<Antecedentes> {
    const antecedente = await this.findOne(id);
    Object.assign(antecedente, data);
    return this.antecedentesRepository.save(antecedente);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.antecedentesRepository.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}

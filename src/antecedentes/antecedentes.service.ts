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
  const nuevo = this.antecedentesRepository.create({
    padre: data.padre,
    madre: data.madre,
    abuelos: data.abuelos,
    hermanos: data.hermanos,
    otros: data.otros,
    historia: { idhistoria: data.historia?.idhistoria || data['id_historia'] }, 
    // 🟢 así TypeORM sabe a qué historia asociarlo
  });

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

  async findByHistoria(idHistoria: number): Promise<Antecedentes[]> {
  return this.antecedentesRepository.find({
    where: { historia: { idhistoria: idHistoria } },
  });
}


}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeguroMedico } from './seguromedico.entity';

@Injectable()
export class SeguroMedicoService {
  constructor(
    @InjectRepository(SeguroMedico)
    private readonly seguroMedicoRepository: Repository<SeguroMedico>,
  ) {}

  async findAll(): Promise<SeguroMedico[]> {
    return this.seguroMedicoRepository.find();
  }

  async findOne(id: number): Promise<SeguroMedico> {
    const seguro = await this.seguroMedicoRepository.findOne({ where: { IdSeguro: id } });
    if (!seguro) {
      throw new NotFoundException(`Seguro médico con id ${id} no encontrado`);
    }
    return seguro;
  }

  async create(data: Partial<SeguroMedico>): Promise<SeguroMedico> {
    if (!data.TipoSeguro || !data.Institucion || !data.NumeroPoliza || !data.Vigencia) {
      throw new BadRequestException('Todos los campos son obligatorios');
    }

    const nuevoSeguro = this.seguroMedicoRepository.create({
      DatosMedicosId: data.DatosMedicosId,
      TipoSeguro: data.TipoSeguro,
      Institucion: data.Institucion,
      NumeroPoliza: data.NumeroPoliza,
      Vigencia: data.Vigencia,
    });

    return this.seguroMedicoRepository.save(nuevoSeguro);
  }

  async update(id: number, data: Partial<SeguroMedico>): Promise<SeguroMedico> {
    const seguro = await this.findOne(id);
    if (!seguro) {
      throw new NotFoundException('Seguro médico no encontrado');
    }

    await this.seguroMedicoRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.seguroMedicoRepository.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}

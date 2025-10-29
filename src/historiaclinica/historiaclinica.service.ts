import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoriaClinica } from './historiaclinica.entity';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @InjectRepository(HistoriaClinica)
    private readonly historiaClinicaRepository: Repository<HistoriaClinica>,
  ) {}

  async findAll(): Promise<HistoriaClinica[]> {
    return this.historiaClinicaRepository.find();
  }

  async findOne(id: number): Promise<HistoriaClinica> {
    const historia = await this.historiaClinicaRepository.findOne({ where: { idhistoria: id } });
    if (!historia) {
      throw new NotFoundException(`Historia clínica con ID ${id} no encontrada`);
    }
    return historia;
  }

  async create(data: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
    if (!data.datosmedicosid) {
      throw new BadRequestException('El campo datosmedicosid es requerido');
    }

    const nuevaHistoria = this.historiaClinicaRepository.create({
      ...data,
      fecharegistro: new Date(),
    });

    return this.historiaClinicaRepository.save(nuevaHistoria);
  }

  async update(id: number, data: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
    const historia = await this.findOne(id);

    await this.historiaClinicaRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.historiaClinicaRepository.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }

  async findByDatosMedicosId(datosmedicosid: number): Promise<HistoriaClinica[]> {
  return this.historiaClinicaRepository.find({ where: { datosmedicosid } });
}

async obtenerPorUsuario(usuarioId: number): Promise<HistoriaClinica[]> { 
  return this.historiaClinicaRepository.find({
    where: { datosMedicos: { id_usuario: usuarioId } }, // 👈 CAMBIO AQUÍ
    relations: ['datosMedicos'],
    order: { fecharegistro: 'DESC' },
  });
}

}

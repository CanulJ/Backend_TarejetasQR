import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosMedicos } from './datosmedicos.entity';

@Injectable()
export class DatosMedicosService {
  constructor(
    @InjectRepository(DatosMedicos)
    private readonly datosMedicosRepository: Repository<DatosMedicos>,
  ) {}

  findAll(): Promise<DatosMedicos[]> {
    return this.datosMedicosRepository.find();
  }

  async findOne(id_datos: number): Promise<DatosMedicos> {
    const dato = await this.datosMedicosRepository.findOne({ where: { id_datos } });
    if (!dato) {
      throw new NotFoundException(`Datos médicos con id ${id_datos} no encontrados`);
    }
    return dato;
  }

  create(datos: DatosMedicos): Promise<DatosMedicos> {
    return this.datosMedicosRepository.save(datos);
  }

  async update(id_datos: number, datos: Partial<DatosMedicos>): Promise<DatosMedicos> {
    await this.datosMedicosRepository.update(id_datos, datos);
    return this.findOne(id_datos);
  }

  async remove(id_datos: number): Promise<{ deleted: boolean }> {
    const result = await this.datosMedicosRepository.delete(id_datos);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}

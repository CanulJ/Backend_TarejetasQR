import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { Medicamentos } from './medicamentos.entity';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly medicamentosService: MedicamentosService) {}

  @Get()
  findAll(): Promise<Medicamentos[]> {
    return this.medicamentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Medicamentos> {
    try {
      return await this.medicamentosService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Medicamento no encontrado',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async create(@Body() data: Partial<Medicamentos>): Promise<Medicamentos> {
    try {
      return await this.medicamentosService.create(data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear el medicamento',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Medicamentos>): Promise<Medicamentos> {
    try {
      return await this.medicamentosService.update(id, data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar el medicamento',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    try {
      return await this.medicamentosService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar el medicamento',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

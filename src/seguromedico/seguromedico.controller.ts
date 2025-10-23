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
import { SeguroMedicoService } from './seguromedico.service';
import { SeguroMedico } from './seguromedico.entity';

@Controller('seguromedico')
export class SeguroMedicoController {
  constructor(private readonly seguroMedicoService: SeguroMedicoService) {}

  @Get()
  findAll(): Promise<SeguroMedico[]> {
    return this.seguroMedicoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SeguroMedico> {
    try {
      return await this.seguroMedicoService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Seguro médico no encontrado',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async create(@Body() data: Partial<SeguroMedico>): Promise<SeguroMedico> {
    try {
      return await this.seguroMedicoService.create(data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear el seguro médico',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<SeguroMedico>): Promise<SeguroMedico> {
    try {
      return await this.seguroMedicoService.update(id, data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar el seguro médico',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    try {
      return await this.seguroMedicoService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar el seguro médico',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

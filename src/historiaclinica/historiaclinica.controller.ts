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
import { HistoriaClinicaService } from './historiaclinica.service';
import { HistoriaClinica } from './historiaclinica.entity';

@Controller('historiaclinica')
export class HistoriaClinicaController {
  constructor(private readonly historiaClinicaService: HistoriaClinicaService) {}

  @Get()
  findAll(): Promise<HistoriaClinica[]> {
    return this.historiaClinicaService.findAll();
  }

  @Get('datosmedicos/:id')
async findByDatosMedicos(@Param('id') id: number): Promise<HistoriaClinica[]> {
  try {
    return await this.historiaClinicaService.findByDatosMedicosId(id);
  } catch (error) {
    throw new HttpException(
      error.message || 'No se encontraron historias clínicas',
      error.status || HttpStatus.NOT_FOUND,
    );
  }
}

@Get('usuario/:id') 
async findByUsuario(@Param('id') usuarioId: number) { 
  return this.historiaClinicaService.obtenerPorUsuario(usuarioId); 
}



  @Post()
  async create(@Body() data: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
    try {
      return await this.historiaClinicaService.create(data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al crear historia clínica',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<HistoriaClinica>): Promise<HistoriaClinica> {
    try {
      return await this.historiaClinicaService.update(id, data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar historia clínica',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    try {
      return await this.historiaClinicaService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar historia clínica',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

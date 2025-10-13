import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DatosMedicosService } from './datosmedicos.service';
import { DatosMedicos } from './datosmedicos.entity';

@Controller('datosmedicos')
export class DatosMedicosController {
  constructor(private readonly datosMedicosService: DatosMedicosService) {}

  @Get()
  findAll(): Promise<DatosMedicos[]> {
    return this.datosMedicosService.findAll();
  }

  @Get('usuario/:id_usuario')
async findByUsuario(@Param('id_usuario') id_usuario: number): Promise<DatosMedicos[]> {
  return this.datosMedicosService.findByUsuario(id_usuario);
}

  @Post()
  create(@Body() datos: DatosMedicos): Promise<DatosMedicos> {
    return this.datosMedicosService.create(datos);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() datos: Partial<DatosMedicos>,
  ): Promise<DatosMedicos> {
    return this.datosMedicosService.update(id, datos);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.datosMedicosService.remove(id);
  }
}

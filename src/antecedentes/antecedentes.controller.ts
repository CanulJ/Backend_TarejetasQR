import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AntecedentesService } from './antecedentes.service';
import { Antecedentes } from './antecedentes.entity';

@Controller('antecedentes')
export class AntecedentesController {
  constructor(private readonly antecedentesService: AntecedentesService) {}

  @Get()
  findAll(): Promise<Antecedentes[]> {
    return this.antecedentesService.findAll();
  }

 @Get('historia/:id')
findByHistoria(@Param('id') id: number) {
  return this.antecedentesService.findByHistoria(id);
}

@Get('usuario/:usuarioId')
async findByUsuario(@Param('usuarioId') usuarioId: number) {
  return this.antecedentesService.findByUsuario(usuarioId);
}



  @Post()
  create(@Body() data: Partial<Antecedentes>): Promise<Antecedentes> {
    return this.antecedentesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Antecedentes>): Promise<Antecedentes> {
    return this.antecedentesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.antecedentesService.remove(id);
  }
}

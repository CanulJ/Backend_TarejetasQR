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

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Antecedentes> {
    return this.antecedentesService.findOne(id);
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

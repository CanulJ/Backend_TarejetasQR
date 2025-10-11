import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Usuarios> {
    return this.usuariosService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Usuarios>): Promise<Usuarios> {
    return this.usuariosService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<Usuarios>,
  ): Promise<Usuarios> {
    return this.usuariosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.usuariosService.remove(id);
  }
}

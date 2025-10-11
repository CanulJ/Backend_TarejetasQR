import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  // Obtener todos los usuarios
  @Get()
  async findAll(): Promise<Usuarios[]> {
    return this.usersService.findAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Usuarios> {
    return this.usersService.findOne(id);
  }

  // Crear un usuario
  @Post()
  async create(@Body() user: Usuarios): Promise<Usuarios> {
    return this.usersService.create(user);
  }

  // Actualizar un usuario por ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Partial<Usuarios>): Promise<Usuarios> {
    return this.usersService.update(id, user);
  }

  // Eliminar un usuario por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    return this.usersService.remove(id);
  }
}

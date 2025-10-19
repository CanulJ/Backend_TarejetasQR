import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Obtener todos los usuarios
  @Get()
  findAll(): Promise<Usuarios[]> {
    return this.usuariosService.findAll();
  }

  // Obtener usuario por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Usuarios> {
    try {
      return await this.usuariosService.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Usuario no encontrado',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  // Crear nuevo usuario
  @Post()
  async create(
    @Body()
    data: {
      nombre: string;
      apellidos?: string;
      curp: string;
      originario?: string;
      correo: string;
      telefono?: string;
      fecha_nacimiento?: Date;
      genero?: string;
      password: string; // campo que recibes sin cifrar
      estado?: string;
      rolid?: number;
    },
  ): Promise<Usuarios> {
    try {
      return await this.usuariosService.create(data);
    } catch (error) {
      console.error('❌ Error al crear usuario:', error.message);
      throw new HttpException(
        error.message || 'Error al crear el usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar usuario
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    data: {
      nombre?: string;
      apellidos?: string;
      curp?: string;
      originario?: string;
      correo?: string;
      telefono?: string;
      fecha_nacimiento?: Date;
      genero?: string;
      password?: string;
      estado?: string;
      rolid?: number;
    },
  ): Promise<Usuarios> {
    try {
      return await this.usuariosService.update(id, data);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al actualizar usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Eliminar usuario
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ deleted: boolean }> {
    try {
      return await this.usuariosService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error al eliminar usuario',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Login de usuario
  @Post('login')
  async login(@Body() body: { correo: string; password: string }) {
    try {
      return await this.usuariosService.login(body.correo, body.password);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error en login',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}


  
  // Obtener todos los usuarios
  findAll(): Promise<Usuarios[]> {
    return this.usuariosRepository.find();
  }


async findOne(id: number): Promise<Usuarios> {
  const usuario = await this.usuariosRepository.findOne({ where: { id } });
  if (!usuario) {
    throw new NotFoundException(`Usuario con id ${id} no encontrado`);
  }
  return usuario;
}


  // Crear un nuevo usuario
  create(usuario: Usuarios): Promise<Usuarios> {
    return this.usuariosRepository.save(usuario);
  }

  // Actualizar un usuario por ID
  async update(id: number, usuario: Partial<Usuarios>): Promise<Usuarios> {
  await this.usuariosRepository.update(id, usuario);
  // findOne ahora nunca devuelve null, así que TypeScript no se queja
  return this.findOne(id);
}

  // Eliminar un usuario por ID
  async remove(id: number): Promise<{ deleted: boolean }> {
  const result = await this.usuariosRepository.delete(id);
  const deleted = result.affected && result.affected > 0 ? true : false;
  return { deleted };
}

}

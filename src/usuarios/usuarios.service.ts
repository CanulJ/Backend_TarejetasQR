import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async findAll(): Promise<Usuarios[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuarios> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  async findByCorreo(correo: string): Promise<Usuarios | undefined> {
    const usuario = await this.usuariosRepository.findOne({ where: { correo } });
    return usuario || undefined;
  }

  async create(data: Partial<Usuarios>): Promise<Usuarios> {
    if (!data.correo) {
      throw new BadRequestException('El correo es requerido');
    }
    if (!data.password_hash) {
      throw new BadRequestException('La contraseña es requerida');
    }
    // Verificar si el correo ya existe
    const existe = await this.findByCorreo(data.correo);
    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    // Hash de contraseña
    const hashedPassword = await bcrypt.hash(data.password_hash, 10);

    const nuevoUsuario = this.usuariosRepository.create({
      ...data,
      password_hash: hashedPassword,
    });

    return this.usuariosRepository.save(nuevoUsuario);
  }

  async update(id: number, data: Partial<Usuarios>): Promise<Usuarios> {
    const usuario = await this.findOne(id);

    if (data.password_hash) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }

    await this.usuariosRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.usuariosRepository.delete(id);
    return { deleted: !!result.affected && result.affected > 0 };
  }

async login(correo: string, password: string) {
  const usuario = await this.findByCorreo(correo);
  if (!usuario) throw new NotFoundException('Usuario no encontrado');

  const passwordValida = await bcrypt.compare(password, usuario.password_hash);
  if (!passwordValida) throw new BadRequestException('Contraseña incorrecta');

  // Retornamos solo los datos públicos
  const { password_hash, ...usuarioSafe } = usuario;
  return usuarioSafe;
}

}

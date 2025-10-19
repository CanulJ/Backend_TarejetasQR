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

  async findByCorreo(correo: string): Promise<Usuarios | null> {
    return await this.usuariosRepository.findOne({ where: { correo } });
  }

  async create(data: any): Promise<Usuarios> {
    const { correo, password, curp } = data;

    if (!correo) throw new BadRequestException('El correo es requerido');
    if (!password) throw new BadRequestException('La contraseña es requerida');
    if (!curp) throw new BadRequestException('La CURP es requerida');

    // Verificar duplicados
    const existeCorreo = await this.findByCorreo(correo);
    if (existeCorreo) throw new BadRequestException('El correo ya está registrado');

    const existeCURP = await this.usuariosRepository.findOne({ where: { curp } });
    if (existeCURP) throw new BadRequestException('La CURP ya está registrada');

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario con los nuevos campos
    const nuevoUsuario = this.usuariosRepository.create({
  nombre: data.nombre,
  apellidos: data.apellidos,
  curp: data.curp,
  originario: data.originario,
  correo: data.correo,
  telefono: data.telefono,
  fechanacimiento: data.fechanacimiento,
  genero: data.genero,
  password_hash: hashedPassword,
  estado: data.estado || 'Activo',
  rolid: data.rolid,
  isActive: true,
  fecha_creacion: new Date(), // <-- esto asegura que se guarde
} as unknown as Usuarios);


    return this.usuariosRepository.save(nuevoUsuario);
  }

  async update(id: number, data: any): Promise<Usuarios> {
    const usuario = await this.findOne(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    if (data.password) {
      data.password_hash = await bcrypt.hash(data.password, 10);
      delete data.password;
    }

    // Evitar duplicados de CURP o correo en actualización
    if (data.correo && data.correo !== usuario.correo) {
      const correoExistente = await this.findByCorreo(data.correo);
      if (correoExistente) {
        throw new BadRequestException('El correo ya está en uso');
      }
    }

    if (data.curp && data.curp !== usuario.curp) {
      const curpExistente = await this.usuariosRepository.findOne({ where: { curp: data.curp } });
      if (curpExistente) {
        throw new BadRequestException('La CURP ya está en uso');
      }
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

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QRCodigos } from './qrcodigos.entity';
import { Usuarios } from '../usuarios/usuarios.entity';

@Injectable()
export class QRCodigosService {
  constructor(
    @InjectRepository(QRCodigos)
    private readonly qrRepository: Repository<QRCodigos>,
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async findAll(): Promise<QRCodigos[]> {
    return this.qrRepository.find({ relations: ['usuario'] });
  }

  async findOne(idqr: number): Promise<QRCodigos> {
    const qr = await this.qrRepository.findOne({ where: { idqr }, relations: ['usuario'] });
    if (!qr) throw new NotFoundException(`Código QR con id ${idqr} no encontrado`);
    return qr;
  }

  async findByUser(userid: number): Promise<QRCodigos[]> {
    return this.qrRepository.find({
      where: { userid },
      relations: ['usuario'],
      order: { fechacreacion: 'DESC' },
    });
  }

  async findByToken(token: string): Promise<QRCodigos | null> {
    return this.qrRepository.findOne({
      where: { urlqrcode: token },
      relations: ['usuario']
    });
  }

  // 🔹 Nuevo método: Buscar por NFC UID
  async findByNFC(nfc_uid: string): Promise<QRCodigos | null> {
    if (!nfc_uid) throw new BadRequestException('UID de NFC es obligatorio');
    return this.qrRepository.findOne({
      where: { nfc_uid },
      relations: ['usuario']
    });
  }

  async create(data: { userid: number; urlqrcode: string; nfc_uid?: string; estado?: string }): Promise<QRCodigos> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: data.userid } });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    if (!data.urlqrcode) throw new BadRequestException('La URL del código QR es obligatoria');

    const nuevoQR = this.qrRepository.create({
      userid: data.userid,
      urlqrcode: data.urlqrcode,
      nfc_uid: data.nfc_uid, // si viene undefined, TypeORM ignora el campo
      estado: data.estado || 'activo',
    });

    return this.qrRepository.save(nuevoQR);
  }

  async update(idqr: number, data: Partial<QRCodigos>): Promise<QRCodigos> {
    const qr = await this.findOne(idqr);
    if (!qr) throw new NotFoundException('Código QR no encontrado');

    await this.qrRepository.update(idqr, data);
    return this.findOne(idqr);
  }

  async remove(idqr: number): Promise<{ deleted: boolean }> {
    const result = await this.qrRepository.delete(idqr);
    return { deleted: !!result.affected && result.affected > 0 };
  }
}

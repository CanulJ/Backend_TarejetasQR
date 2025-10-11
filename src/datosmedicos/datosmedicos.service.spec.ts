import { Test, TestingModule } from '@nestjs/testing';
import { DatosMedicosService } from './datosmedicos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DatosMedicos } from './datosmedicos.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DatosmedicosService', () => {
  let service: DatosMedicosService;
  let repo: Repository<DatosMedicos>;

  const mockDatos = {
    id_datos: 1,
    id_usuario: 1,
    tipo_sangre: 'O+',
    alergias: 'Penicilina',
    medicamentos: 'Paracetamol',
    enfermedades: 'Asma',
    contacto_emergencia: '555-1234',
    usuario: {
      id: 1,
      nombre: 'Test User',
      correo: 'test@example.com',
      password_hash: 'hash123',
      fecha_creacion: new Date(),
      isActive: true
    }
  };

  const mockDatosRepository = {
    find: jest.fn().mockResolvedValue([mockDatos]),
    findOne: jest.fn().mockResolvedValue(mockDatos),
    save: jest.fn().mockResolvedValue(mockDatos),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatosMedicosService,
        {
          provide: getRepositoryToken(DatosMedicos),
          useValue: mockDatosRepository,
        },
      ],
    }).compile();

    service = module.get<DatosMedicosService>(DatosMedicosService);
    repo = module.get<Repository<DatosMedicos>>(getRepositoryToken(DatosMedicos));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('Debe retornar todos los datos médicos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockDatos]);
    expect(repo.find).toHaveBeenCalledTimes(1);
  });

  it('Debe retornar un registro médico por ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockDatos);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id_datos: 1 } });
  });

  it('Debe lanzar error si el registro médico no existe', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('Debe crear un nuevo registro médico', async () => {
    const nuevoDato = {
      id_usuario: 2,
      tipo_sangre: 'A-',
      alergias: 'Ninguna',
      medicamentos: 'Ibuprofeno',
      enfermedades: 'Ninguna',
      contacto_emergencia: '555-6789',
    };

    jest.spyOn(repo, 'save').mockResolvedValueOnce({ 
      id_datos: 2,
      ...nuevoDato,
      usuario: {
        id: 2,
        nombre: 'Test User',
        correo: 'test@example.com',
        password_hash: 'hash123',
        fecha_creacion: new Date(),
        isActive: true
      }
    });

    const result = await service.create(nuevoDato as DatosMedicos);
    expect(result).toHaveProperty('id_datos', 2);
    expect(repo.save).toHaveBeenCalledWith(nuevoDato);
  });

  it('Debe actualizar un registro médico existente', async () => {
    const updateData = { tipo_sangre: 'B+' };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce({ ...mockDatos, ...updateData });

    const result = await service.update(1, updateData);
    expect(result.tipo_sangre).toBe('B+');
    expect(repo.update).toHaveBeenCalledWith(1, updateData);
  });

  it('Debe eliminar un registro médico existente', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ deleted: true });
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuariosService],
  controllers: [UsuariosController]
})
export class UsuariosModule {}

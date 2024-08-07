import { Module } from '@nestjs/common';
import { ServidoresService } from './servidores.service';
import { ServidoresController } from './servidores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero, NivelResponsabilidad, Puestos, Ramo, AreaServidor, InsercionesUsuarios, ProcedimientoServidor, ResponsabilidadServidor, Servidor, ServidoresEnContrataciones, TipoArea, TipoProcedimiento } from './entities/servidore.entity';
import { Dependencias } from './entities/dependencias.entity';

@Module({
  controllers: [ServidoresController],
  providers: [ServidoresService],
  imports: [
    TypeOrmModule.forFeature([
      Genero, Ramo, Puestos, NivelResponsabilidad, 
      TipoArea, TipoProcedimiento, Servidor, Dependencias,
      ServidoresEnContrataciones, ResponsabilidadServidor,
      ProcedimientoServidor, AreaServidor, InsercionesUsuarios
    ])
  ]
})
export class ServidoresModule { }

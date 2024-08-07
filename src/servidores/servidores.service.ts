import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServidoreDto } from './dto/create-servidore.dto';
import { UpdateServidoreDto } from './dto/update-servidore.dto';
import { Repository, DataSource } from 'typeorm';
import { Puestos, Servidor, ServidoresEnContrataciones, AreaServidor, ResponsabilidadServidor, ProcedimientoServidor, TipoArea } from './entities/servidore.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Dependencias} from './entities/dependencias.entity'
import { v4 as uuid } from 'uuid';
@Injectable()
export class ServidoresService {
  constructor(
    @InjectRepository(Servidor)
    private readonly servidoresRepository: Repository<Servidor>,
    @InjectRepository(Puestos)
    private readonly puestoRepository: Repository<Puestos>,
    @InjectRepository(ServidoresEnContrataciones)
    private readonly ServidoresEnContratacionesRepository: Repository<ServidoresEnContrataciones>,
    @InjectRepository(Dependencias)
    private readonly DependenciasRepository: Repository<Dependencias>,
    @InjectRepository(AreaServidor)
    private readonly AreaServidorRepository: Repository<AreaServidor>,
    @InjectRepository(ResponsabilidadServidor)
    private readonly ResponsabilidadServidorRepository: Repository<ResponsabilidadServidor>,
    @InjectRepository(ProcedimientoServidor)
    private readonly ProcedimientoServidorRepository: Repository<ProcedimientoServidor>,
    private readonly dataSource: DataSource,
    
  ) {}


  // >4 CREAR UN SERVIDOR EN CONTRATACIONES
 async  create(createServidoreDto: CreateServidoreDto) {
  /*
  
  : 0. CREAR VARIABLES INICIALES
  : 1. Encontrar si existe el puesto sobre la institucion sino crearlo para el servidor
  : 2. Encontrar si existe el puesto sobre la institucion sino crearlo para el superior
  : 3. 
  : 4. Nivel de responsabilidad
  : 5. Contratación
  : 6. Fecha de ingreso
  : 7. Fecha de salida
  : 8. Observaciones
  : 9. Estatus
  */ 

  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    // >3 INIT VARS
    const { 
      Nombres, Puesto ,Genero, CURP, 
      SIIdPuesto, SIPuesto, SICURP, 
      SIGenero, SINombres, SIRFC, SIPrimerApellido, 
      SISegundoApellido, siglasDependencia, IdPuesto, 
      IDRamo, EjercicioFiscal, ProcedimientosServidor,
      ResponsabilidadesServidor, AreasServidor} = createServidoreDto
    const dependencia = siglasDependencia
    const idPostUser = "Default";

    // >3 CREAR O ENCONTRAR PUESTOS
    let puestoServidor = await this.puestoRepository.findOne({ where: { IdPuesto: IdPuesto, Entidad: dependencia } });
    if (!puestoServidor) {
      const crearServidor = this.puestoRepository.create({...createServidoreDto, Entidad: dependencia});
      puestoServidor = await this.puestoRepository.save(crearServidor);
      console.log("Puesto de servidor Creado")
    }
    let puestoJefeServidor = await this.puestoRepository.findOne({ where: { IdPuesto: SIIdPuesto, Entidad: dependencia } });
    if (!puestoJefeServidor) {
      const crearServidor = this.puestoRepository.create({IdPuesto:SIIdPuesto, Puesto: SIPuesto , Entidad: dependencia});
      puestoJefeServidor = await this.puestoRepository.save(crearServidor);
      console.log("Puesto de jefe del servidor Creado")
    }
  
   
   // >3 CREAR O ENCONTRAR SERVIDORES
   let servidor = await this.servidoresRepository.findOne({ where: {CURP: CURP, Puesto: {IdPuesto: IdPuesto} }});
   
   if (!servidor) {
    const crearServidor = this.servidoresRepository.create({
      ...createServidoreDto,
      Puesto: puestoServidor,
      Genero: {IdGenero: Genero},
      idPostUser: idPostUser
    });
    servidor = await this.servidoresRepository.save(crearServidor);
    console.log("Servidor Creado")
   }
   
   let jefeServidor = await this.servidoresRepository.findOne({ where: {CURP: SICURP, Puesto: {IdPuesto: SIIdPuesto} }});
   
   if (!jefeServidor) {
    const servidor = this.servidoresRepository.create({
      Nombres: SINombres,
      PrimerApellido: SIPrimerApellido,
      SegundoApellido: SISegundoApellido,
      CURP: SICURP,
      RFC: SIRFC,
      Puesto: puestoJefeServidor,
      Genero: {IdGenero: SIGenero},
      idPostUser: idPostUser
    });
    jefeServidor = await this.servidoresRepository.save(servidor);
    console.log("jefe servidor creado")
   }
    // >3 CREAR SERVIDOR EN CONTRATOS
    const dependenciaEncontrada = await this.DependenciasRepository.findOne({where: {SiglasDependencia : siglasDependencia}})


    const validarServidor = await this.ServidoresEnContratacionesRepository.findOne({where: {Servidor: servidor, EjercicioFiscal: EjercicioFiscal,  Dependencia: {SiglasDependencia: siglasDependencia}}})
    if (validarServidor) {
      throw new BadRequestException(`El funcionario ${Nombres}, en el puesto ${Puesto} en la dependencia ${siglasDependencia} ya existe para el ejersicio del año ${EjercicioFiscal}`);
    }
    
    const ServidoresEnContrataciones = this.ServidoresEnContratacionesRepository.create({
      Dependencia: dependenciaEncontrada,
      EjercicioFiscal: EjercicioFiscal,
      Servidor: servidor,
      SuperiorInmediato: jefeServidor,
      idPostUser: idPostUser,
      Ramo: { IDRamo: IDRamo }
    });
    const servidorEnContratosCreado = await this.ServidoresEnContratacionesRepository.manager.save(ServidoresEnContrataciones)

    const crearAreas = AreasServidor.map(
      area => this.AreaServidorRepository.create({IdTipoArea: area, IdServidorEnContrataciones:  servidorEnContratosCreado.IdServidorEnContrataciones})
     )
    const crearResponsabilidadServidor = ResponsabilidadesServidor.map(
      resposabilidad => this.ResponsabilidadServidorRepository.create({IdNivelResponsabilidad: resposabilidad, IdServidorEnContrataciones:  servidorEnContratosCreado.IdServidorEnContrataciones})
    )
    const crearProcedimientoServidor = ProcedimientosServidor.map(
      procedimiento => this.ProcedimientoServidorRepository.create({IdTipoProcedimiento: procedimiento, IdServidorEnContrataciones:  servidorEnContratosCreado.IdServidorEnContrataciones})
    )

    await this.AreaServidorRepository.manager.save(crearAreas)
    await this.ResponsabilidadServidorRepository.manager.save(crearResponsabilidadServidor)
    await this.ProcedimientoServidorRepository.manager.save(crearProcedimientoServidor)
   await queryRunner.commitTransaction();
   await queryRunner.release();
  
   
    return servidorEnContratosCreado


    
  } catch (error) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    console.log(error);
    throw new BadRequestException(error.message);
    
  }
  }

  async findAllServidores(): Promise<Servidor[]> {
    const servidores = await this.servidoresRepository.find()
    return servidores;
  }

  async findOne(id: string): Promise<any> {
    const servidor = await this.ServidoresEnContratacionesRepository.findOne({where: {IdServidorEnContrataciones: id }, relations: ['Servidor',   'AreaServidor', 'ProcedimientoServidor', 'ResponsabilidadServidor', ]})
    
  const result = { ...servidor,
    AreaServidor: servidor.AreaServidor.map(area => (area.TipoArea.TipoArea)),
    ProcedimientoServidor: servidor.ProcedimientoServidor.map(procedimiento => (procedimiento.TipoProcedimiento.TipoProcedimiento)),
    ResponsabilidadServidor: servidor.ResponsabilidadServidor.map(responsabilidad => (responsabilidad.NivelResponsabilidad.NivelResponsabilidad))
  
  }
    

    return result;
  }

  update(id: number, updateServidoreDto: UpdateServidoreDto) {
    return `This action updates a #${id} servidore`;
  }

  remove(id: number) {
    return `This action removes a #${id} servidore`;
  }
}

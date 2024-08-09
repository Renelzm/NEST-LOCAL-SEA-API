import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm";
import { Dependencias } from "./dependencias.entity";



@Entity('Genero')
export class Genero {

    @PrimaryColumn()
    IdGenero: string;

    @Column({ type: 'varchar' })
    Genero: string;
}

// Definir entidad de ramo
@Entity('Ramo')
export class Ramo {
  @PrimaryColumn()
  IDRamo: string;

  @Column({ type: 'varchar' })
  Ramo: string;
}


// TODO Crear espacio de Id uuid rellenar y entidad en base de datos original
@Entity('Puesto')
export class Puestos {
  @PrimaryGeneratedColumn('uuid')
  IdPuestoEntidad: string;
  @Column({ type: 'varchar' })
  IdPuesto: string;
  @Column({ type: 'varchar' })
  Puesto: string;
  @Column({ type: 'varchar' })
  Entidad: string;
}

// Definir entidad de NivelResponsabilidad
@Entity('NivelResponsabilidad')
export class NivelResponsabilidad {
 @PrimaryColumn({ type: 'varchar' })
  IdNivelResponsabilidad: string;

  @Column({ type: 'varchar' })
  NivelResponsabilidad: string;
}

// Definir entidad de TipoArea
@Entity('TipoArea')
export class TipoArea {
@PrimaryColumn({ type: 'varchar' })
  IdTipoArea: string;

  @Column({ type: 'varchar' })
  TipoArea: string;
}

@Entity('TipoProcedimiento')
export class TipoProcedimiento {
@PrimaryColumn({ type: 'varchar' })
  IdTipoProcedimiento: string;

  @Column({ type: 'varchar' })
  TipoProcedimiento: string;
}


// Definir entidad de servidor
@Entity('Servidores')
export class Servidor {
  @PrimaryGeneratedColumn('uuid')
  IdServidor: string;

  @Column({ 
    type: 'varchar',
  })
  RFC: string;

  @Column({ type: 'varchar',})
  CURP: string;

  @Column({ type: 'varchar' })
  Nombres: string;

  @Column({ type: 'varchar' })
  PrimerApellido: string;

  @Column({ type: 'varchar' })
  SegundoApellido: string;

  @ManyToOne(() => Genero)
  @JoinColumn({ name: 'IdGenero' })
  Genero: Genero;

  @ManyToOne(() => Puestos)
  @JoinColumn({ name: 'IdPuesto' })
  Puesto: Puestos;

  @Column({ type: 'varchar' , nullable: true})
  idPostUser: string;
}

// Definir entidad de ServidoresEnContrataciones
@Entity('ServidoresEnContrataciones')
export class ServidoresEnContrataciones {
  @PrimaryGeneratedColumn('uuid')
  IdServidorEnContrataciones: string;

  @CreateDateColumn({ type: 'date' })
  FechaCaptura: Date;

  @Column({ type: 'varchar' })
  EjercicioFiscal: string;

  @Column()
  IdServidor: Servidor;

  @ManyToOne(() => Ramo)
  @JoinColumn({ name: 'IDRamo' })
  Ramo: Ramo;

  @ManyToOne(() => Servidor)
  @JoinColumn({ name: 'IdServidor' })
  Servidor: Servidor;

  @ManyToOne(() => Dependencias)
  @JoinColumn({ name: 'IdDependencia' })
  
  Dependencia: Dependencias;

  @ManyToOne(() => Servidor,{ eager: true })
  @JoinColumn({ name: 'IdSuperiorInmediato' })
  SuperiorInmediato: Servidor;

  @Column({ type: 'varchar' })
  idPostUser: string;

  @OneToMany(() => AreaServidor, area => area.ServidoresEnContrataciones)
  AreaServidor: AreaServidor[];

  @OneToMany(() => ResponsabilidadServidor, responsabilidad => responsabilidad.ServidoresEnContrataciones)
  ResponsabilidadServidor: ResponsabilidadServidor[];

  @OneToMany(() => ProcedimientoServidor, procedimiento => procedimiento.ServidoresEnContrataciones)
  ProcedimientoServidor: ProcedimientoServidor[];
}


// Definir entidad de ResponsabilidadServidor
@Entity('ResponsabilidadServidor')
export class ResponsabilidadServidor {
    @PrimaryColumn({ type: 'varchar'})
    IdServidorEnContrataciones: string;
    @PrimaryColumn({ type: 'varchar'})
    IdNivelResponsabilidad: string;
    @Column({ type: 'varchar', nullable: true})
    IdDependencia: string;

  @ManyToOne(() => ServidoresEnContrataciones, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'IdServidorEnContrataciones' })
  ServidoresEnContrataciones: ServidoresEnContrataciones;

  @ManyToOne(() => NivelResponsabilidad, { eager: true })
  @JoinColumn({ name: 'IdNivelResponsabilidad' })
  NivelResponsabilidad: NivelResponsabilidad;
}

// Definir entidad de AreaServidor
@Entity('AreaServidor')
export class AreaServidor {
    @PrimaryColumn({ type: 'varchar'})
    IdServidorEnContrataciones: string;
    @PrimaryColumn({ type: 'varchar'})
    IdTipoArea: string;
  @ManyToOne(() => ServidoresEnContrataciones,  {onDelete: "CASCADE"})
  @JoinColumn({ name: 'IdServidorEnContrataciones' })
  ServidoresEnContrataciones: ServidoresEnContrataciones;

  @ManyToOne(() => TipoArea, { eager: true })
  @JoinColumn({ name: 'IdTipoArea' })
  TipoArea: TipoArea;
}

// Definir entidad de ProcedimientoServidor
@Entity('ProcedimientoServidor')
export class ProcedimientoServidor {
    @PrimaryColumn({ type: 'varchar'})
    IdServidorEnContrataciones: string;
    @PrimaryColumn({ type: 'varchar'})
    IdTipoProcedimiento: string;

  @ManyToOne(() => ServidoresEnContrataciones,  {onDelete: "CASCADE"})
  @JoinColumn({ name: 'IdServidorEnContrataciones' })
  ServidoresEnContrataciones: ServidoresEnContrataciones;

  @ManyToOne(() => TipoProcedimiento, { eager: true })
  @JoinColumn({ name: 'IdTipoProcedimiento' })
  TipoProcedimiento: TipoProcedimiento;
}

// Definir entidad de InsercionesUsuarios
@Entity('InsercionesUsers')
export class InsercionesUsuarios {
  @PrimaryGeneratedColumn('uuid')
  Idusuario: string;

  @Column({ type: 'varchar' })
  usuarioEmail: string;

  @Column({ type: 'varchar' })
  tabla: string;

  @Column({ type: 'varchar' })
  IdDato: string;

  @Column({ type: 'date' })
  Fecha: Date;
}
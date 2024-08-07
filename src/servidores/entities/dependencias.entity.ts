import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

// Definir entidad de Dependencias
@Entity('Dependencia')
export class Dependencias {
  @PrimaryGeneratedColumn('uuid')
  IdDependencia: string;

  @Column({ type: 'varchar' })
  SiglasDependencia: string;

  @Column({ type: 'varchar' })
  Dependencia: string;
}

// Definir entidad de UsuariosInstitucion
@Entity('UsuariosDeInstituciones')
export class UsuariosInstitucion {
  @PrimaryGeneratedColumn('uuid')
  IdUsuario: string;

  @Column({ type: 'varchar' })
  Nombres: string;

  @Column({ type: 'varchar' })
  PrimerApellido: string;

  @Column({ type: 'varchar' })
  SegundoApellido: string;

  @Column({ type: 'varchar', unique: true })
  Correo: string;

  @Column({ type: 'varchar' })
  Telefono: string;

  @Column({ type: 'varchar' })
  PuestoActual: string;

  @ManyToOne(() => Dependencias, { eager: true })
  @JoinColumn({ name: 'IdDependencia' })
  Dependencia: Dependencias;

  @Column({ type: 'varchar' })
  siglasInstitucion: string;

  @Column({ type: 'tinyint', default: 1 })
  Estado: number;

  @Column({ type: 'tinyint', default: 0 })
  CheckPass: number;

  @Column({ type: 'varchar' })
  Role: string;

  @Column({ type: 'text' })
  Password: string;

  @Column({ type: 'varchar' })
  idPostUser: string;

  toJSON() {
    const values: any = { ...this };
    delete values.Password;
    values.uid = values.IdUsuario;
    delete values.IdUsuario;
    return values;
  }
}

export default {
  UsuariosInstitucion,
  Dependencias
};

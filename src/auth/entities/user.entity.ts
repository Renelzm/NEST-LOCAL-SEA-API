import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('UsuariosDeInstituciones')
export class UserEntity {
    static findOneBy(arg0: { email: string; }) {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn('uuid')
    IdUsuario: string;
    @Column({ type: 'varchar' })
    Nombres: string;
    @Column({ type: 'varchar' })
    PrimerApellido: string;
    @Column({ type: 'varchar' })
    SegundoApellido: string;
    @Column({ type: 'varchar' })
    PuestoActual: string;
    @Column({ type: 'varchar', unique: true })
    Correo: string;
    @Column({ type: 'varchar', select: false })
    Password: string;
    @Column({ type: 'varchar' })
    telefono: string;
    @Column({ type: 'varchar' })
    nombreInstitucion: string;
    @Column({ type: 'varchar' })
    siglasInstitucion: string;
    @Column({ type: 'varchar', default: 'USER-INSTITUCION'})
    Role?: string;
    @Column({ type: 'smallint', default: 1 })
    Estado: number;
    @Column({ type: 'smallint', default: 0 })
    CheckPass: number;
    @Column({ type: 'varchar', nullable: true })
    IdDependencia?: string;
    @Column({ type: 'varchar', nullable: true, select: false })
    idPostUser: string;


    
}

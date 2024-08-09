import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from 'class-transformer';


export class CreateUserDto {

    @IsString()
    @MinLength(1)
    Nombres: string;

    @IsString()
    @MinLength(1)
    PrimerApellido: string;

    @IsString()
    @MinLength(1)
    SegundoApellido: string;

    @IsString()
    @MinLength(1)
    PuestoActual: string;

    @IsString()
    @MinLength(1)
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    Correo: string;

    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    Password: string;

    @IsString()
    @MinLength(1)
    telefono: string;

    @IsString()
    @MinLength(1)
    nombreInstitucion: string;

    @IsString()
    @MinLength(1)
    siglasInstitucion: string;

    @IsString()
    @MinLength(1)
    @IsOptional()
    @IsIn(['ADMIN', 'USER-INSTITUCION', 'USER-INSTITUCION-CONCENTRADORA', 'USER-CONTRATOS', 'USER-CONTRATOS-CONCENTRADORA'])
    Role?: string;


}

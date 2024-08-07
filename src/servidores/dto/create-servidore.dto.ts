import { IsArray, IsIn, isIn, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { Transform } from 'class-transformer';

export class CreateServidoreDto {

    @IsString()
    @MinLength(1)
    Nombres : string;
    
    @IsString()
    @MinLength(1)
    PrimerApellido : string;
    
    @IsString()
    @MinLength(1)
    SegundoApellido : string;
    
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(['M', 'F', 'O'], {message: "El genero debe ser M o F" })
    Genero : string;
    
    @IsString()
    @MinLength(1)
    Puesto : string;
    
    @IsString()
    @MinLength(1)
    IdPuesto : string;
    
    @IsString()
    @MinLength(1)
    @MinLength(18,  {message: "El CURP es muy corto"})
    @MaxLength(18, {message: "El CURP es demasiado largo"})
    CURP : string;
    
    @IsString()
    // @MinLength(13,  {message: "El Rfc es muy corto"})
    // @MaxLength(13, {message: "El Rfc es demasiado largo"})
    RFC : string;
    
    @IsString()
    @MinLength(1)
    EjercicioFiscal : string;
    
    @IsString()
    @MinLength(1)
    IDRamo : string;
    
    @IsString()
    @MinLength(1)
    SINombres : string;
    
     @IsString()
    @MinLength(1)
    SIPrimerApellido : string;
    
     @IsString()
    @MinLength(1)
    SISegundoApellido : string;
    
     @IsString()
    @MinLength(1)
    SIGenero : string;
    
     @IsString()
    @MinLength(1)
    SIIdPuesto: string;
    
     @IsString()
    @MinLength(1)
    SIPuesto : string;
    
     @IsString()
    @MinLength(1)
    SICURP : string;
    
     @IsString()
    @MinLength(1)
    SIRFC : string;
    
     @IsString({each: true})
    AreasServidor : string[];
    
     @IsString({each: true})
    ResponsabilidadesServidor: string[];
    
    @IsArray()
    ProcedimientosServidor: string[];
    
    @IsString()
    @MinLength(1)
    siglasDependencia: string
  //   "Dependencia": "54a93313-208e-4d22-ac45-c0b55ebfc47c"

}

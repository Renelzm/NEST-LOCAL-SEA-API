import { IsEmail, IsString, MinLength } from "class-validator";



export class LoginUserDto {

    @IsString()
    @MinLength(1)
    @IsEmail()
    Correo: string;

    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    Password: string;


}

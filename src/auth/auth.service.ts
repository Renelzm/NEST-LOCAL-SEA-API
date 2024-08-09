import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import {compareSync, hashSync} from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ){}

  async createNewUser(createUserDto: CreateUserDto) {
    try {
      const nuevoUsuario = this.userRepository.create(createUserDto)

      const password =  hashSync(nuevoUsuario.Password, 10)
      const userHashed = {...nuevoUsuario, Password: password}
      const {Password, ...data} =  await this.userRepository.save(userHashed),
      token = this.getjwtToken({email: userHashed.Correo, id: userHashed.IdUsuario, Role: userHashed.Role})
      
      return {
        ...data, token
      }
    } catch (error) {
      throw new BadRequestException(error.detail)
    }

  }
  async login(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOne({where: {Correo: loginUserDto.Correo}, select: {Correo: true, Password: true, IdUsuario: true, Role: true}})
    
    if(!user) throw new BadRequestException('Usuario no encontrado')
    if(!compareSync(loginUserDto.Password, user.Password)) throw new BadRequestException('Contraseña incorrecta')
      const {Password ,...userNoPassword} = user
    return {...userNoPassword, token: this.getjwtToken({email: user.Correo, id: user.IdUsuario, Role: user.Role})}
  }

  private getjwtToken( payload: JwtPayload ){
   
      const token = this.jwtService.sign(payload)
      return token
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  findOneTests(user: UserEntity) {
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

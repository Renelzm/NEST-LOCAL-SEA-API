import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, ForbiddenException, HttpException, Injectable  } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {

    const { id } = payload
    const user = await this.userRepository.findOne({where: {IdUsuario: id}, select: {Correo: true, Password: true, Estado: true, IdUsuario: true, Role: true}})
  
    if (!user ) {
      throw new BadRequestException('Usuario no encontrado');
    }
    if (!user.Estado ) {
        throw new ForbiddenException('Usuario inactivo');
    }

    return user;
  }
}
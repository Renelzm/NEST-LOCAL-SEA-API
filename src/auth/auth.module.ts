import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, TypeOrmModule, PassportModule, JwtModule],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    })
    // JwtModule.register({
    //   secret: process.env.SECRET,
    //   signOptions: { expiresIn: '7d' },
    // }),

  ]
})
export class AuthModule {}

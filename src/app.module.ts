import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServidoresModule } from './servidores/servidores.module';
import { Servidor } from './servidores/entities/servidore.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      autoLoadEntities: true, // Automatically loads entities from the 'dist' folder
      entities: [Servidor],
      synchronize: true,
    }),
    ServidoresModule,
    AuthModule,

  ],
  
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from 'src/models/user.model';
import { Token } from 'src/models/token.model';
import 'dotenv/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule.register({
        global: true,
        secret: process.env.SECRET ,
        signOptions: { expiresIn: '60s' },
      }),
    SequelizeModule.forRoot({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [User, Token],
        autoLoadModels: true,
        synchronize: true
      }),
  ],
})
export class AppModule {}
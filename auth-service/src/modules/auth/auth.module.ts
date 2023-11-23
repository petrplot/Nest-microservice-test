import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/user.module';
import { Token } from 'src/models/token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forFeature([Token, User])
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    Response,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { User } from 'src/models/user.model';
import { MessagePattern, Payload } from '@nestjs/microservices';

  
  @Controller()
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @MessagePattern('user.login')
    async login(@Payload() dto: AuthUserDto) {
      const dataUser = await this.authService.login(dto.email, dto.password);
      return dataUser
    }
    


    @MessagePattern('user.reg')
    async regisrt(@Payload() dto: AuthUserDto ) {
      return await this.authService.registr(dto);
    }

    @MessagePattern('user.out')
    async logout(@Payload() data) {
      console.log(data);
      return await this.authService.logout(data);
    }

    @Get()
    refreshTokens(){

    }

  
    @UseGuards(AuthGuard)
    @MessagePattern('guard')
    getProfile(@Request() req) {
      return req.user;
    }
  }
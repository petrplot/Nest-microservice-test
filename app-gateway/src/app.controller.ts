import { Body, Controller, Get, Inject, Param, Post, Query, Req, Res  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as cookie from 'cookie'

@Controller('users')
export class AppController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
  ) {}

  @Get('/')
  getAllUsers() {
    return this.client.send('get.All.Users', {})
  }

  @Get('/:id')
  async getUserById(@Param('id') id){

    const userResponse:any = await firstValueFrom(this.client.send('get.user.by.id', {id}))
    return {
      data: userResponse
    }
  }

  @Post('/login')
  async login(@Body()data, @Res({ passthrough: true }) res){
    const userResponse:any = await firstValueFrom(this.client.send('user.login', data))

    res.setHeader('Set-cookie', cookie.serialize('refreshToken',userResponse.refreshToken,{
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }))
      
    return {
      token: userResponse.accessToken,
      data: userResponse.userDto
    }
  }

    @Post('/reg')
    async registr(@Body()data, @Res({ passthrough: true }) res){
      const userResponse:any = await firstValueFrom(this.client.send('user.reg', data)) 
      
      res.setHeader('Set-cookie', cookie.serialize('refreshToken',userResponse.refreshToken,{
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      }))
      
      return {
        token: userResponse.accessToken,
        data: userResponse.userDto
      }
    }
    

  @Post('/out')
 async logout(@Req()req, @Res() res){
  try {
     const reqCookie = req.cookies
   
    console.log('get refresh token ', reqCookie.refreshToken);
    if(reqCookie.refreshToken){
      res.setHeader('Set-cookie', cookie.serialize('refreshToken', reqCookie.refreshToken,{
        maxAge: 0,
        httpOnly: true,
      }))
      const response:any = await firstValueFrom(this.client.send('user.out', reqCookie.refreshToken)) 
      return {
        response:response
      }
    }
  } catch (e) {
    console.log(e);
    
  }
   
  }

  @Post('/guard')
  getUserG(){
    return this.client.send('guard', {})
  }

}

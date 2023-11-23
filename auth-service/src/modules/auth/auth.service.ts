import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/models/token.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { UserDto } from 'src/dto/user-dto';
import { Validator } from 'src/utils/validator';
import { IReturnObjectUser } from 'src/interfaces/auth.interface';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,

    @InjectModel(Token)
    private tokenModel: typeof Token,
    ) {}

    

    async login(email:string, password:string):Promise<IReturnObjectUser>{
        try {
            
            const emailValid = Validator.isEmail(email);
            const passValid = Validator.isPassword( password );
            if (!emailValid) {
              throw 'некорректный email ';
            }
            if (!passValid) {
               throw 'некорректный password ';
              }

            const user = await this.usersService.findByEmail(email);
            if (!user) {
              throw 'пользователь с таким емайл аддрессом не найден'
            }

            const checkPass = await bcrypt.compare(password, user.password);
            if (!checkPass) {
             throw 'неверный пароль'
            }
            const accessToken = await this.jwtService.signAsync({user:UserDto})
            const refreshToken  = await this.jwtService.signAsync({user:UserDto})
            
            const tokenExist = await this.tokenModel.findOne({ where: { user_id: user.id } });
            if (tokenExist) {
              await Token.update({ token: refreshToken }, { where: { user_id: user.id } });
            } else {
              await Token.create({ token: refreshToken, user_id: user.id });
            }
            const userDto = new UserDto(user)
            return { userDto , accessToken, refreshToken }
          } catch (e) {
            console.log(e);
            
          }
      }

      async registr(email:string, password:string):Promise<IReturnObjectUser> {
        try {
            const emailValid = Validator.isEmail(email);
            const passValid = Validator.isPassword( password );

            if (!emailValid) {
              console.log('некорректный email');
              throw 'некорректный email ';
            }
            if (!passValid) {
              console.log('некорректный pass');
                throw 'некорректный password ';
              }
            const candidate = await this.usersService.findByEmail(email);
            if (candidate) {
              console.log('пользователь с таким емайл аддрессом уже существует');
                throw 'пользователь с таким емайл аддрессом уже существует'
            }

            const hashPass = await bcrypt.hash(password, 5);

            const user = await this.usersService.createUser({ email, password: hashPass });
            if(user){
              console.log('user created',user );
              
            }
            const accessToken = await this.jwtService.signAsync({user:UserDto})
            const refreshToken  = await this.jwtService.signAsync({user:UserDto})
            await this.tokenModel.create({ token: refreshToken, userId: user.id });
            const userDto = new UserDto(user)
            return { userDto, accessToken, refreshToken }
          } catch (e) {
            console.log(e);
            
          }
      }

      async logout(refreshToken:string) {
        try {
          console.log('logout');
          
            if (refreshToken) {
              
              return await this.tokenModel.destroy({ where: { token: refreshToken } });
            }
            
          } catch (e) {
            console.log(e)
            
          }
      }

}
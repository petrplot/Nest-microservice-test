import { iUserDto } from "./user.interface";


export interface IReturnObjectUser{
    userDto:iUserDto,
    accessToken:string,
    refreshToken:string
}
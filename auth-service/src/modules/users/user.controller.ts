import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {  Payload, MessagePattern} from '@nestjs/microservices';


@Controller()
export class UserController {
    constructor(
        private userService: UserService
    ){}

   @MessagePattern('get.All.Users')
   getAll(){
       return this.userService.findAll()
   }

   @MessagePattern('get.user.by.id')
   getById(@Payload() id){
    console.log('payloud id ', id);
    
        return this.userService.findById(id)
   }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { iUser } from 'src/interfaces/user.interface';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService {
    
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ){}


    async findById({id}): Promise<User | undefined> {

        return await this.userModel.findOne({where:{
        id
    }});
    }

    async findByEmail(email:string): Promise<User | undefined> {
        return await this.userModel.findOne({where:{
            email
        }});
        }

    async findAll(): Promise<User[] | undefined> {
        return await this.userModel.findAll();
    }

    async createUser(data:iUser){
        console.log('data from createUser', data);
        
        return this.userModel.create({...data})
    }
   
}
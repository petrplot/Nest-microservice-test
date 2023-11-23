import { UUID } from "crypto"

export interface iUserDto{
    //id: UUID,
    email: string,
    role?: string
}

export interface iUser{
    email: string,
    password:string
    role?: string
}
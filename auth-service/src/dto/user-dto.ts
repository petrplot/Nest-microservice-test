import { UUID } from "crypto";
import { iUserDto } from "src/interfaces/user.interface";


export class UserDto {
  //readonly  id:UUID
  readonly  email:string
  readonly role?:string

  constructor(model:iUserDto) {
    this.email = model.email;
    //this.id = model.id;
    this.role = model.role;
  }
}
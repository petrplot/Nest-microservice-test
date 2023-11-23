
import { UUID } from 'crypto';
import { UUIDV4} from 'sequelize';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class User extends Model {

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: 'User' })
  role: string;
}
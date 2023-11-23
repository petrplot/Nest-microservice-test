
import { UUIDV4 } from 'sequelize';
import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Token extends Model {
    
    @Column
    token: string;

    @Column
    user_id:number

}
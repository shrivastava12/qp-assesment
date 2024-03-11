import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import * as _ from 'lodash';
import { UserRole } from './types';
@Table({})
@Exclude()
export class User extends Model<User> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  @Expose({ toPlainOnly: true })
  id: number;

  @Column({ allowNull: false, unique: true })
  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => _.toLower(value))
  @IsEmail()
  email: string;

  @Column({ allowNull: false })
  @IsNotEmpty()
  password: string;

  @Column
  @Expose()
  @IsNotEmpty()
  firstName: string;

  @Column
  @Expose()
  lastName: string;

  @Column
  @Expose()
  phoneNumber: string;

  @Column
  @Expose()
  @IsNotEmpty()
  @IsEnum(_.values(UserRole))
  role: UserRole;

  @Column
  @Expose()
  active: boolean;
}

import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import * as _ from 'lodash';
import { ActionType } from './types';
import { User } from './User';
import { Product } from './Product';

@Table({})
export class Stock extends Model<Stock> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  @Expose({ toPlainOnly: true })
  id: number;

  @Column({ allowNull: false })
  @Expose()
  quantity: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  @ForeignKey(() => Product)
  productId: number;

  @BelongsTo(() => Product, 'productId')
  @Expose({ toPlainOnly: true })
  product: Product;

  @Column
  @Expose()
  @IsNotEmpty()
  @IsEnum(_.values(ActionType))
  action: ActionType;

  @Column(DataType.BIGINT)
  @ForeignKey(() => User)
  createdByUserId: number;

  @BelongsTo(() => User, {
    onDelete: 'set null',
    hooks: true,
    foreignKey: 'createdByUserId',
  })
  createdBys: User;
  @Column(DataType.BIGINT)
  @ForeignKey(() => User)
  updatedByUserId: number;

  @BelongsTo(() => User, {
    onDelete: 'set null',
    hooks: true,
    foreignKey: 'updatedByUserId',
  })
  updatedBys: User;
}

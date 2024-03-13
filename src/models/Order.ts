import { Exclude, Expose } from 'class-transformer';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';

@Table({})
@Exclude()
export class Order extends Model<Order> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  @Expose({ toPlainOnly: true })
  id: number;

  @Column(DataType.BIGINT)
  @Expose()
  @ForeignKey(() => User)
  orderBy: number;

  @BelongsTo(() => User, {
    hooks: true,
    foreignKey: 'orderBy',
  })
  user: User;

  @Column({ allowNull: false })
  @Expose()
  totalPrice: number;
}

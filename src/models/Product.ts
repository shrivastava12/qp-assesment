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
export class Product extends Model<Product> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  @Expose({ toPlainOnly: true })
  id: number;

  @Column({ allowNull: false })
  @Expose()
  name: string;

  @Column(DataType.BIGINT)
  @ForeignKey(() => User)
  createdByUserId: number;

  @BelongsTo(() => User, {
    onDelete: 'set null',
    hooks: true,
    foreignKey: 'createdByUserId',
  })
  createdBy: User;
  @Column(DataType.BIGINT)
  @ForeignKey(() => User)
  updatedByUserId: number;

  @BelongsTo(() => User, {
    onDelete: 'set null',
    hooks: true,
    foreignKey: 'updatedByUserId',
  })
  updatedBy: User;

  @Column({ allowNull: false })
  @Expose()
  price: number;

  @Column({ allowNull: false })
  @Expose()
  quantity: number;
}

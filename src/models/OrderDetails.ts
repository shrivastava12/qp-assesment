import { Exclude, Expose } from 'class-transformer';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from './Order';
import { Product } from './Product';

@Table({})
@Exclude()
export class OrderDetail extends Model<OrderDetail> {
  @Column(DataType.BIGINT)
  @ForeignKey(() => Order)
  @Expose()
  orderId: number;

  @BelongsTo(() => Order, {
    foreignKey: 'orderId',
  })
  order: Order;

  @Column(DataType.BIGINT)
  @Expose({ toPlainOnly: true })
  @ForeignKey(() => Product)
  productId: number;

  @BelongsTo(() => Product, {
    foreignKey: 'productId',
  })
  product: Product;

  @Column({ allowNull: false })
  @Expose()
  price: number;

  @Column({ allowNull: false })
  @Expose()
  quantity: number;
}

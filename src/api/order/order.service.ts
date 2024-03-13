import { BadRequestException, Injectable } from '@nestjs/common';
import { Order, OrderDetail, Product } from 'src/models';
import * as _ from 'lodash';
@Injectable()
export class OrderService {
  async create(order, user) {
    try {
      const orderData = {
        totalPrice: order.totalPrice,
        orderBy: user.id,
      };
      const orderResponse = await Order.create(orderData);
      console.log(orderResponse, 'OrderResponse');
      if (orderResponse) {
        await this.updateProductQunatity(order.items);
        const orderDetail = _.map(order.items, (product) => {
          return {
            orderId: orderResponse.id,
            productId: product.productId,
            price: product.price,
            quantity: product.quantity,
          };
        });
        const orderDetailResponse = await OrderDetail.bulkCreate(orderDetail);
        return orderDetailResponse;
      }
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async updateProductQunatity(products) {
    try {
      _.map(products, async (product) => {
        const productInfo = await Product.findOne({
          where: { id: product.productId },
        });
        if (productInfo) {
          productInfo.quantity -= product.quantity;
          await productInfo.save();
        }
      });
      return 'successfull';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { ActionType, Product, Stock } from 'src/models';

@Injectable()
export class StockService {
  async create(stock: Stock, user) {
    try {
      stock.createdByUserId = user.id;
      stock.updatedByUserId = user.id;

      if (stock.productId) {
        const product = await Product.findOne({
          where: { id: stock.productId },
        });
        if (stock.action === ActionType.Add) {
          product.quantity += stock.quantity;
        } else if (stock.action === ActionType.Sub) {
          if (product.quantity > 0 && product.quantity < stock.quantity) {
            product.quantity -= stock.quantity;
          } else {
            throw new BadRequestException('Not enough product to delete');
          }
        }
        product.updatedByUserId = user.id;
        await product.save();
      }
      const response = await stock.save();
      if (!response) {
        throw new BadRequestException('Bad Request');
      }
      return response;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async getAll() {
    try {
      const response = await Stock.findAll({});
      return response;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

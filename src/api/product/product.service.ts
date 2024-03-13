import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from 'src/models/Product';

@Injectable()
export class ProductService {
  async create(product: Product, user) {
    try {
      product.createdByUserId = user.id;
      product.updatedByUserId = user.id;
      const response = await product.save();
      if (!response) {
        throw new BadRequestException('Bad Request');
      }
      return response;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async update(id: number, product: Product, user) {
    try {
      const updatedValue = Object.fromEntries(
        Object.entries(product.dataValues).filter(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_key, value]) =>
            value !== undefined && value !== null && value !== '',
        ),
      );
      updatedValue.id = id;
      updatedValue.updatedByUserId = user.id;
      const response = await Product.update(updatedValue, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async delete(id: number) {
    try {
      const deletedItem = await Product.destroy({
        where: {
          id,
        },
      });
      return `${deletedItem} Deleted successfully`;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async getAll(): Promise<Product[]> {
    try {
      const products = await Product.findAll({});
      return products;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

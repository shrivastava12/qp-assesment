import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { Product } from 'src/models/Product';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * @param product object
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() product: Product, @Request() req) {
    return await this.productService.create(product, req.user);
  }

  /**
   * @param id
   * @param product
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
    @Request() req,
  ) {
    return await this.productService.update(id, product, req.user);
  }

  /**
   *
   * @param id
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
  /**
   *
   * @returns Product[]
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async get(): Promise<Product[]> {
    return await this.productService.getAll();
  }
}

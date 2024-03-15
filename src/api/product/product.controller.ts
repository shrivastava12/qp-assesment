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
import { ProductService } from './product.service';
import { Product } from 'src/models/Product';
import { Roles } from 'src/decoraters/roles/roles.decorator';
import { JwtAuthGuard } from 'src/gaurds/jwt.guard';
import { RoleGuard } from 'src/gaurds/role/role.guard';
import { UserRole } from 'src/models';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * @param product object
   * @param req
   * @returns
   */
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(
    @Body() product: Product,
    @Request() req,
  ): Promise<Product | string> {
    return await this.productService.create(product, req.user);
  }

  /**
   * @param id
   * @param product
   * @param req
   * @returns
   */
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
    @Request() req,
  ): Promise<string> {
    return await this.productService.update(id, product, req.user);
  }

  /**
   *
   * @param id
   * @returns
   */
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.productService.delete(id);
  }
  /**
   *
   * @returns Product[]
   */
  @Roles(UserRole.User, UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  async get(): Promise<Product[]> {
    return await this.productService.getAll();
  }
}

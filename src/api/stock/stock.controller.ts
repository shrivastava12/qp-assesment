import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock, UserRole } from 'src/models';
import { Roles } from 'src/decoraters/roles/roles.decorator';
import { JwtAuthGuard } from 'src/gaurds/jwt.guard';
import { RoleGuard } from 'src/gaurds/role/role.guard';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  /**
   *
   * @param body
   * @param req
   * @returns
   */
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async create(@Body() body: Stock, @Request() req) {
    return await this.stockService.create(body, req.user);
  }

  /**
   *
   * @returns
   */
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('getAll')
  async getAll() {
    return await this.stockService.getAll();
  }
}

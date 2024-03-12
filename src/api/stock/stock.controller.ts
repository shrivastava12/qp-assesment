import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthGuard } from '@nestjs/passport';
import { Stock } from 'src/models';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  /**
   *
   * @param body
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() body: Stock, @Request() req) {
    return await this.stockService.create(body, req.user);
  }

  /**
   *
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAll() {
    return await this.stockService.getAll();
  }
}

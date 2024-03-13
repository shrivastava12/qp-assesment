import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() body, @Request() req) {
    return this.orderService.create(body, req.user);
  }
}

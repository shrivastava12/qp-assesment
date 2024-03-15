import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/decoraters/roles/roles.decorator';
import { JwtAuthGuard } from 'src/gaurds/jwt.guard';
import { RoleGuard } from 'src/gaurds/role/role.guard';
import { UserRole } from 'src/models';
import { IOrderRequest } from 'src/interfaces';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  /**
   *
   * @param body
   * @param req
   * @returns
   */
  @Roles(UserRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() body: IOrderRequest, @Request() req) {
    return this.orderService.create(body, req.user);
  }
}

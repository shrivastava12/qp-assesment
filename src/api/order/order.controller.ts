import { Body, Controller, Post, Request } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Post('create')
  async create(@Body body, @Request req) {
    
  }
}

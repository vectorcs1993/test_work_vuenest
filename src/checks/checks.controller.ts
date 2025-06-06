import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CheckService } from './checks.service';

@Controller('checks')
export class CheckController {
  constructor(private readonly service: CheckService) { }

  @Get('')
  getChecks(): Promise<any[]> {
    return this.service.getAll();
  }
  @Post()
  create(@Body() data: { user: number, sum: number }) {
    return this.service.create(data.user, data.sum);
  }
  @Get('from_user/:id')
  getChecksFromUser(@Param('id') id: number): Promise<any[]> {
    return this.service.getChecksFromUser(id);
  }
}

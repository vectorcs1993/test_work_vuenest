import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) { }

  @Get()
  getUsers(): Promise<any[]> {
    return this.service.getAll();
  }
  @Post()
  create(@Body() data: { name: string }) {
    this.service.create(data.name);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    this.service.delete(id);
  }

  @Get('with_checks')
  getUsersWithChecks(): Promise<any[]> {
    return this.service.getAllDataWithCheck();
  }
}

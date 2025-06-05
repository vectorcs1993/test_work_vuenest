import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('users')
  getUsers(): Promise<any[]> {
    return this.appService.getUsers();
  }
  @Get('checks')
  getChecks(): Promise<any[]> {
    return this.appService.getChecks();
  }
}

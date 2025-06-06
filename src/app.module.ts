import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChecksModule } from './checks/checks.module';


@Module({
  imports: [UsersModule, ChecksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

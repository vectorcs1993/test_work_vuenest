import { Module } from '@nestjs/common';
import { CheckController } from './checks.controller';
import { CheckService } from './checks.service';

@Module({
  controllers: [CheckController],
  providers: [CheckService],
})
export class ChecksModule {}
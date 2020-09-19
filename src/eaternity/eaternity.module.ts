import { Module } from '@nestjs/common';
import { EaternityController } from './eaternity.controller';
import { EaternityService } from './eaternity.service';

@Module({
  controllers: [EaternityController],
  providers: [EaternityService],
  exports: [EaternityService],
})
export class EaternityModule {}

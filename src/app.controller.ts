import { Controller, Get } from '@nestjs/common';
import { EaternityService } from './eaternity/eaternity.service';

@Controller()
export class AppController {
  constructor(private eaternityService: EaternityService) {}

  @Get()
  getHello(): {message: string} {
    return { message: "👀" };
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Get('/user/:deviceId')
  async getByDeviceId(@Param('deviceId') deviceId: string, @Query('when') when: string): Promise<any> {
    if (!when) {
      when = `${Date.now()}`;
    }
    return await this.purchaseService.scoreSumForDeviceId(deviceId, parseInt(when, 10));
  }

  @Get('/geographic-areas')
  async getGeographicAreas(@Query('when') when: string) {
    if (!when) {
      when = `${Date.now()}`;
    }
    return await this.purchaseService.scoreSumForAreas(parseInt(when, 10));
  }
}

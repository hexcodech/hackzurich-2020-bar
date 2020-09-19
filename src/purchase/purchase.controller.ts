import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.schema';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Get('/user/:deviceId')
  async getByDeviceId(@Param('deviceId') deviceId: string, @Query('when') when: string): Promise<{score: number, count: number}> {
    if (!when) {
      when = `${Date.now()}`;
    }
    return await this.purchaseService.scoreSumForDeviceId(deviceId, parseInt(when, 10));
  }

  @Get('/geographic-areas')
  async getGeographicAreas(@Query('when') when: string): Promise<{plz: number, score: number, count: number}[]> {
    if (!when) {
      when = `${Date.now()}`;
    }
    return await this.purchaseService.scoreSumForAreas(parseInt(when, 10));
  }

  @Post('/')
  async createPurchase(@Body('deviceId') deviceId: string, @Body('date') timestamp: number, @Body('score') score: number): Promise<Purchase> {
    return await this.purchaseService.createPurchase(deviceId, timestamp, score);
  }
}

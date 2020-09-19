import { Controller, Post, Body } from '@nestjs/common';
import { EaternityService, IngredientDescription, IngredientInfo } from './eaternity.service';

@Controller('eaternity')
export class EaternityController {
  constructor(private eaternityService: EaternityService) {}

  @Post('')
  async getEanInfo(@Body() body: IngredientDescription): Promise<IngredientInfo> {
    return await this.eaternityService.getIngredientInfo(body);
  }
}

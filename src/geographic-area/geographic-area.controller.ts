import { Controller, Get } from '@nestjs/common';
import { GeographicAreaService } from './geographic-area.service';

@Controller('geographic-area')
export class GeographicAreaController {
  constructor(private geographicAreaService: GeographicAreaService) {}

  /*@Get()
  async startImport(): Promise<void> {
    await this.geographicAreaService.importCSV();
  }*/
}

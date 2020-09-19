import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeographicArea, GeographicAreaSchema } from './geographic-area.schema';
import { GeographicAreaService } from './geographic-area.service';
import { GeographicAreaController } from './geographic-area.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: GeographicArea.name, schema: GeographicAreaSchema}
    ])
  ],
  providers: [GeographicAreaService],
  exports: [GeographicAreaService],
  controllers: [GeographicAreaController],
})
export class GeographicAreaModule {}

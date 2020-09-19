import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeographicArea, GeographicAreaSchema } from './geographic-area.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: GeographicArea.name, schema: GeographicAreaSchema}
    ])
  ]
})
export class GeographicAreaModule {}

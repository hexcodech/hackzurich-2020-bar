import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GeographicArea } from './geographic-area.schema';
import { Model } from "mongoose";

@Injectable()
export class GeographicAreaService {
  constructor(@InjectModel(GeographicArea.name) private geographicAreaModel: Model<GeographicArea>) {}

  async getAllAreas(): Promise<GeographicArea[]> {
    return await this.geographicAreaModel.find({}).exec();
  }
}

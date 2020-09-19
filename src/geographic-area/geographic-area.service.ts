import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GeographicArea } from './geographic-area.schema';
import { Model } from "mongoose";
import * as fs from 'fs';

@Injectable()
export class GeographicAreaService {
  constructor(@InjectModel(GeographicArea.name) private geographicAreaModel: Model<GeographicArea>) {}

  async getAllAreas(): Promise<GeographicArea[]> {
    return await this.geographicAreaModel.find({}).exec();
  }

  async importCSV(): Promise<void> {
    await new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/../../plz_text.txt`, async (err, data) => {
        console.error(err);
        const dataString = data.toString('utf-8');
        const lines = dataString.split('\n');
  
        const promises = lines.map(line => {
          //console.log(line);
          const values = line.split(';');
          if (line) {
            const model = new this.geographicAreaModel({
              plz: parseInt(values[0], 10),
              city: values[1],
              canton: values[2],
              longitude: parseFloat(values[3]),
              latitude: parseFloat(values[4]),
            });
            return model.save();
          }
        });

        Promise.all(promises)
          .then(() => {console.log("hi");resolve()})
          .catch((err) => {
            console.dir(err);
        });
      });
    });
  }
}

import { Injectable, HttpException } from '@nestjs/common';
import { Purchase } from './purchase.schema';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { GeographicAreaService } from 'src/geographic-area/geographic-area.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    private userService: UserService,
    private geographicAreaService: GeographicAreaService,
  ) {}

  async scoreSumForDeviceId(deviceId: string, when: number): Promise<{score: number, count: number}> {
    try {
      const user = await this.userService.findByDeviceId(deviceId);
      const result = await this.purchaseModel
        .aggregate([
          {$match: {_user: (user as any)._id, date: {$gte: new Date(when - parseInt(process.env.SCORE_SUM_DAYS, 10) * 24 * 60 * 60 * 1000), $lt: new Date(when)}}},
          {$group: {
            _id: null,
            score: {$sum: '$score'},
            count: {$sum: 1},
          }}
        ])
        .exec();

        return {
          score: result[0] ? result[0].score / result[0].count : 0,
          count: result[0] ? result[0].count : 0,
        };
    } catch (err) {
      console.error(err);
      throw new HttpException('Database whoopsie', 500);
    }
  }

  async scoreSumForAreas(when: number) {
    try {
      const result = await this.purchaseModel
        .aggregate([
          {$match: {date: {$gte: new Date(when - parseInt(process.env.SCORE_SUM_DAYS, 10) * 24 * 60 * 60 * 1000), $lt: new Date(when)}}},
          {$lookup: {from: 'users', localField: '_user', foreignField: '_id', as: 'user'}},
          {$unwind: '$user'},
          {$lookup: {from: 'geographicareas', localField: 'user._geographicArea', foreignField: '_id', as: 'geographicArea'}},
          {$unwind: '$geographicArea'},
          {$group: {
            _id: '$geographicArea.plz',
            score: {$sum: '$score'},
            count: {$sum: 1},
          }},
          {$project: {
            score: {$divide: ['$score', '$count']},
            count: 1,
          }}
        ])
        .exec();

      return result;
    } catch (err) {
      console.error(err);
      throw new HttpException('Database whoospie', 500);
    }
  }
}

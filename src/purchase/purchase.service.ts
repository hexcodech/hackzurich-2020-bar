import { Injectable, HttpException } from '@nestjs/common';
import { Purchase } from './purchase.schema';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { GeographicAreaService } from 'src/geographic-area/geographic-area.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase.name) private purchaseModel: Model<Purchase>,
    private userService: UserService,
    private geographicAreaService: GeographicAreaService,
  ) {}

  async scoreSumForDeviceId(deviceId: string, when: number): Promise<{score: number, count: number}> {
    const user = await this.userService.findByDeviceId(deviceId);
    if (!user) {
      throw new HttpException('No such user', 400);
    }
    try {
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

  async scoreSumForAreas(when: number): Promise<{plz: number, score: number, count: number}[]> {
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
            city: {$first: '$geographicArea.city'},
            canton: {$first: '$geographicArea.canton'},
            longitude: {$first: '$geographicArea.longitude'},
            latitude: {$first: '$geographicArea.latitude'},
          }},
          {$project: {
            _id: 0,
            plz: '$_id',
            score: {$divide: ['$score', '$count']},
            count: 1,
            city: 1,
            canton: 1,
            longitude: 1,
            latitude: 1,
          }}
        ])
        .exec();

      /** We're generating some fake scores for one city in each canton */
      const allAreas = await this.geographicAreaService.getAllAreas();
      const cantonSet = new Set();
      allAreas.forEach((element) => {
        if (!cantonSet.has(element.canton)) {
          result.push({...((element as any).toObject()), score: Math.floor(Math.random() * 2000), count: Math.floor(Math.random() * 1000)})
          cantonSet.add(element.canton);
        }
      });
      /** We don't need this in production, obviously ;) */

      return result;
    } catch (err) {
      console.error(err);
      throw new HttpException('Database whoopsie', 500);
    }
  }

  async createPurchase(deviceId: string, timestamp: number, score: number, count: number): Promise<Purchase> {
    const user = await this.userService.findByDeviceId(deviceId);
    if (!user) {
      throw new HttpException('No such user', 400);
    }
    try {
      for (let i = 0; i < count; i++) {
        const purchase = new this.purchaseModel({
          _user: (user as any)._id,
          date: new Date(timestamp),
          score,
        });
        return await purchase.save();
      }
    } catch (err) {
      console.error(err);
      throw new HttpException('Database whoopsie', 500);
    }
  }
}

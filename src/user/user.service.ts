import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByDeviceId(deviceId: string): Promise<User> {
    try {
      return await this.userModel
        .findOne({deviceId})
        .populate('_geographicArea')
        .exec();
    } catch(err) {
      throw new HttpException('Database whoopsie', 500);
    }
  }

  async create(deviceId: string, geographicArea: Types.ObjectId): Promise<User> {
    try {
      const newUser = new this.userModel({deviceId, _geographicArea: geographicArea});
      await newUser.save();
      return newUser;
    } catch(err) {
      throw new HttpException('Database whoopsie', 500);
    }
  }
}
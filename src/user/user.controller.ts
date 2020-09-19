import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Types } from "mongoose";
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:deviceId')
  async getByDeviceId(@Param('deviceId') deviceId: string): Promise<User> {
    return await this.userService.findByDeviceId(deviceId);
  }

  @Post('/')
  async newUser(@Body('deviceId') deviceId: string, @Body('geographicArea') geographicArea: Types.ObjectId): Promise<User> {
    return await this.userService.create(deviceId, geographicArea);
  }
}

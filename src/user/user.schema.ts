import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { GeographicArea } from "src/geographic-area/geographic-area.schema";

@Schema()
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  deviceId: string;

  @Prop({
    ref: GeographicArea.name,
    required: true,
    index: true,
  })
  _geographicArea: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
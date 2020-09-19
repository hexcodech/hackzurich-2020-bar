import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";

@Schema()
export class Purchase extends Document {
  @Prop({
    ref: User.name,
    index: true,
    required: true,
  })
  _user: Types.ObjectId;

  @Prop({
    index: true,
    required: true,
    default: Date.now,
  })
  date: Date;

  @Prop({
    required: true,
  })
  score: number;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
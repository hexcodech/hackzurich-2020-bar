import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class AlternativeProduct extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  ean: number;

  @Prop({
    required: true,
    default: [],
  })
  alternatives: [number];
}

export const AlternativeProductSchema = SchemaFactory.createForClass(AlternativeProduct);
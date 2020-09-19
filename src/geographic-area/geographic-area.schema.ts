import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class GeographicArea extends Document {
  @Prop({
    required: true,
    index: true,
  })
  plz: number;

  @Prop({
    required: true,
    index: true,
  })
  city: string;

  @Prop({
    required: true,
    index: true,
  })
  canton: string;

  @Prop({
    required: true,
  })
  longitude: number;

  @Prop({
    required: true,
  })
  latitude: number;
}

export const GeographicAreaSchema = SchemaFactory.createForClass(GeographicArea);
GeographicAreaSchema.index({longitude: 1, latitude: 1}, {unique: true});
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './purchase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Purchase.name, schema: PurchaseSchema}
    ])
  ]
})
export class PurchaseModule {}

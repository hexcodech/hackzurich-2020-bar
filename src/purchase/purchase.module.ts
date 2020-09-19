import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './purchase.schema';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { UserModule } from 'src/user/user.module';
import { GeographicAreaModule } from 'src/geographic-area/geographic-area.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Purchase.name, schema: PurchaseSchema}
    ]),
    UserModule,
    GeographicAreaModule
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}

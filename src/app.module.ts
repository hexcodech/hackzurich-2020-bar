import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { EaternityService } from './eaternity.service';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { GeographicAreaModule } from './geographic-area/geographic-area.module';
import { AlternativeProductModule } from './alternative-product/alternative-product.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    PurchaseModule,
    GeographicAreaModule,
    AlternativeProductModule,
  ],
  controllers: [AppController],
  providers: [EaternityService],
})
export class AppModule {}

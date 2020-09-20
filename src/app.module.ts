import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PurchaseModule } from './purchase/purchase.module';
import { GeographicAreaModule } from './geographic-area/geographic-area.module';
import { AlternativeProductModule } from './alternative-product/alternative-product.module';
import { EaternityModule } from './eaternity/eaternity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    PurchaseModule,
    GeographicAreaModule,
    AlternativeProductModule,
    EaternityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

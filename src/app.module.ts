import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { CountryModule } from './country/country.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CountryModule,
    HeroModule,
    MongooseModule.forRoot('mongodb://localhost/dana-heroes',{ useNewUrlParser: true, useUnifiedTopology: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { CountryModule } from './country/country.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CountryModule,
    HeroModule,
    MongooseModule.forRoot('mongodb://localhost/dana-heroes',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

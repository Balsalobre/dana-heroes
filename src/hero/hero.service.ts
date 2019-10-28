import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './interfaces/hero.interface';
import { Country } from '../country/interfaces/country.interface';
import { CreateHeroDTO } from './dto/hero.dto';
import { ObjectId, ObjectID } from 'mongodb';

@Injectable()
export class HeroService {
    constructor(
        @InjectModel('Hero') private heroModel: Model<Hero>,
        @InjectModel('Country') private countryModel: Model<Country>
    ) {}

    async getHeroes(): Promise<Hero[]> {
        const heroes =  await this.heroModel.find().sort('-createdAt').populate({path: 'country'});
        return heroes;
    }

    async getHero(heroId: string): Promise<Hero> {
        return await this.heroModel.findById(heroId).populate({path: 'country'});
    }

    async createHero(createHeroDTO: CreateHeroDTO): Promise<Hero> {
        const hero =  new this.heroModel(createHeroDTO);
        return await hero.save();
    }

    async deleteHero(heroId: string): Promise<Hero> {
        return await this.heroModel.findByIdAndDelete(heroId).populate({path: 'country'});
    }

    async updateHero(heroId: string, createHeroDTO: CreateHeroDTO): Promise<Hero> {
        return await this.heroModel.findByIdAndUpdate(heroId, createHeroDTO, {new: true}).populate({path: 'country'});
    }

    async getHeroesByCountryName(name: string): Promise<Hero[]> {
        const country = await this.countryModel.findOne({ name: name });
        const query = { country: new ObjectID(country._id)};
        return await this.heroModel.find(query);
    }
}

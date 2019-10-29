import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './interfaces/hero.interface';
import { Country } from '../country/interfaces/country.interface';
import { CreateHeroDTO } from './dto/hero.dto';
import { ObjectId, ObjectID } from 'mongodb';
import { QueryPaginateDTO } from './dto/query-paginate.dto';

@Injectable()
export class HeroService {
    constructor(
        @InjectModel('Hero') private heroModel: Model<Hero>,
        @InjectModel('Country') private countryModel: Model<Country>
    ) {}

    async getHeroes(options: QueryPaginateDTO): Promise<{heroes: Hero[], total: number}> {
        const { offset, limit } = options;
        const heroes =  await this.heroModel.find()
            .skip(+offset)
            .limit(+limit)
            .sort('-createdAt')
            .populate({path: 'country'});

        return {heroes, total: heroes.length};
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
        if(!country) throw new NotFoundException('Este País no existe');
        const query = { country: new ObjectID(country._id)};
        return await this.heroModel.find(query);
    }
}

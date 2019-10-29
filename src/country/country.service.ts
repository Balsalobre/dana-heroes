import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from './interfaces/country.interface';
import { CreateCountryDTO } from './dto/country.dto';

@Injectable()
export class CountryService {
    constructor(
        @InjectModel('Country') private countryModel: Model<Country>    
    ) {}

    async getCountries(): Promise<Country[]> {
        return await this.countryModel.find();
    }

    async getCountry(countryId: string): Promise<Country> {
        return await this.countryModel.findById(countryId);
    }

    async createCountry(createCountryDTO: CreateCountryDTO): Promise<Country> {
        const hero =  new this.countryModel(createCountryDTO);
        return await hero.save();
    }

    async deleteCountry(countryId: string): Promise<Country> {
        return await this.countryModel.findByIdAndDelete(countryId);
    }

    async updateCountry(countryId: string, createCountryDTO: CreateCountryDTO): Promise<Country> {
        return await this.countryModel.findByIdAndUpdate(countryId, createCountryDTO, {new: true});
    }
}

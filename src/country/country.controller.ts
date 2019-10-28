import { Controller, Post, Body, Res, HttpStatus, Get, Delete, Query, NotFoundException} from '@nestjs/common';
import { CreateCountryDTO } from './dto/country.dto';
import { CountryService } from './country.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Countries')
@Controller('country')
export class CountryController {

    constructor(private countryService: CountryService) {}

    @Post('/create')
    async createCountry(@Res() res, @Body() createCountryDTO: CreateCountryDTO) {
        const createCountry = await this.countryService.createCountry(createCountryDTO);
        return res.status(HttpStatus.OK).json({
            message: 'recived',
            country: createCountry
        })
    }

    @Get('/')
    async getProducts(@Res() res) {
       const countries = await this.countryService.getCountries();
       res.status(HttpStatus.OK).json({
        countries
       })
    }

    @Delete('/delete')
    async deleteCountry(@Res() res, @Query('countryId') countryId: string) {
       const countryDeleted = await this.countryService.deleteCountry(countryId);
       if (!countryDeleted) throw new NotFoundException('El País no existe!');
       return res.status(HttpStatus.OK).json({
           message: 'Country Deleted Succesfully',
           countryDeleted
       });
    }
   
   



}


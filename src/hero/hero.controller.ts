import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query} from '@nestjs/common';
import { CreateHeroDTO } from './dto/hero.dto'
import { HeroService } from './hero.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Heroes')
@Controller('hero')
export class HeroController {

    constructor(private heroService: HeroService){}

    @Post('/create')
    async createHero(@Res() res, @Body() createHeroDTO: CreateHeroDTO) {
        const hero = await this.heroService.createHero(createHeroDTO);
        return res.status(HttpStatus.OK).json({
            message: 'recived',
            hero
        });
    }

    @Get('/')
    async getHeroes(@Res() res) {
        const heroes = await this.heroService.getHeroes();
        res.status(HttpStatus.OK).json({
            heroes
        });
    }

    @Get('/:id')
    async getHero(@Res() res, @Param('id') id: string) {
        const hero = await this.heroService.getHero(id);
        if (!hero) throw new NotFoundException('El heroe no existe');
        return res.status(HttpStatus.OK).json(hero);
    }

    @Delete('/delete')
    async deleteHero(@Res() res, @Query('heroID') heroID: string) {
        const heroDeleted = await this.heroService.deleteHero(heroID);
        if(!heroDeleted) throw new NotFoundException('El héroe no existe');
        return res.status(HttpStatus.OK).json({
            message: 'El héroe ha sido borrado',
            heroDeleted
        });
    }

    @Put('/update')
    async updateHero(
        @Res() res,
        @Body() createHeroDTO: CreateHeroDTO,
        @Query('heroID') heroID: string
        ) {
            const updateHero = await this.heroService.updateHero(heroID, createHeroDTO);
            if(!updateHero) throw new NotFoundException('El héroe no existe');
            return res.status(HttpStatus.OK).json({
                message: 'Heroe modificado con éxito',
                updateHero
            });
        }

    @Get('/country/:name')
    async getHeroesByCountryName(@Res() res, @Param('name') name: string) {
        const heroes = await this.heroService.getHeroesByCountryName(name);
        return res.status(HttpStatus.OK).json({
            message: `Heroes de ${name}`,
            heroes
        })

    }
}    

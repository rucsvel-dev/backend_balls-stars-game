import {Body, Controller, Get, Post} from '@nestjs/common';
import {GetUser} from "../auth/get-user.decorator";
import {HeroesService} from "./heroes.service";
import {HeroLevelUpDto} from "./dtos/hero-level-up.dto";

@Controller('heroes')
export class HeroesController {
    constructor(
        private readonly heroesService: HeroesService
    ) {
    }

    @Get('getMyHeroes')
    getMyHeroes(
        @GetUser() user
    ){
        return this.heroesService.getMyHeroes(user);
    }

    @Post('heroLevelUp')
    heroLevelUp(
        @Body() heroLevelUpDto: HeroLevelUpDto,
        @GetUser() user
    ){
        return this.heroesService.heroLevelUp(heroLevelUpDto, user);
    }

}

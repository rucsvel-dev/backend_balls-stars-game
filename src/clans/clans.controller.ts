import {Body, Controller, Post} from '@nestjs/common';

import {ClansService} from "./clans.service";
import {CreateClanDto} from "./dtos/create-clan.dto";

@Controller('clans')
export class ClansController {
    constructor(
        private readonly clansService: ClansService
    ) {
    }

    @Post('createClan')
    createClan(
        @Body() createClanDto: CreateClanDto,
    ){
        return this.clansService.createClan(createClanDto)
    }
}

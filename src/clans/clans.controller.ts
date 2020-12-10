import {Body, Controller, Post} from '@nestjs/common';

import {ClansService} from "./clans.service";
import {CreateClanDto, CreateClanOutput} from "./dtos/create-clan.dto";
import {GetUser} from "../auth/get-user.decorator";
import {JoinToClanDto, JoinToClanOutput} from "./dtos/joinToClan.dto";

@Controller('clans')
export class ClansController {
    constructor(
        private readonly clansService: ClansService
    ) {
    }

    @Post('createClan')
    createClan(
        @Body() createClanDto: CreateClanDto,
        @GetUser() user
    ): Promise<CreateClanOutput>{
        return this.clansService.createClan(createClanDto, user)
    }

    @Post('joinToClan')
    joinToClan(
        @Body() joinToClanDto: JoinToClanDto,
        @GetUser() user
    ): Promise<JoinToClanOutput>{
        return this.clansService.joinToClan(joinToClanDto, user)
    }
}

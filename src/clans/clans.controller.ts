import {Body, Controller, Get, Post} from '@nestjs/common';

import {ClansService} from "./clans.service";
import {CreateClanDto, CreateClanOutput} from "./dtos/create-clan.dto";
import {GetUser} from "../auth/get-user.decorator";
import {JoinToClanDto, JoinToClanOutput} from "./dtos/join-to-clan.dto";
import {Clan} from "./entities/clan.entity";
import {GetClansOutput} from "./dtos/get-clans.dto";
import {SendClanMessageDto, SendClanMessageOutput} from "./dtos/send-clan-message.dto";

@Controller('clans')
export class ClansController {
    constructor(
        private readonly clansService: ClansService
    ) {
    }

    @Get()
    getClans(): Promise<GetClansOutput>{
        return this.clansService.getClans();
    }

    @Post('sendClanMessage')
    sendClanMessage(
        @Body() sendClanMessageDto: SendClanMessageDto,
        @GetUser() user
    ): Promise<SendClanMessageOutput>{
        return this.clansService.sendClanMessage(sendClanMessageDto, user)
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

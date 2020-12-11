import { Module } from '@nestjs/common';
import { ClansService } from './clans.service';
import { ClansController } from './clans.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Clan} from "./entities/clan.entity";
import {ClanRequest} from "./entities/clanRequest.entity";
import {ClanMessage} from "./entities/clanMessage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Clan, ClanRequest, ClanMessage])],
  providers: [ClansController, ClansService],
  controllers: [ClansController]
})
export class ClansModule {}

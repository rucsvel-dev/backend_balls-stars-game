import { Module } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { BattlesController } from './battles.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Battle} from "./entities/battle.entity";
import {BattleMode} from "./entities/battleMode.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Battle, BattleMode])],
  providers: [BattlesService],
  controllers: [BattlesController]
})
export class BattlesModule {}

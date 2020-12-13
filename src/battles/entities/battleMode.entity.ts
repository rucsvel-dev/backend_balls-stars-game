import {Column, Entity, OneToMany} from 'typeorm';
import {IsBoolean, IsNumber, IsString} from 'class-validator';

import { CoreEntity } from "../../common/entities/core.entity";
import {Battle} from "./battle.entity";

@Entity()
export class BattleMode extends CoreEntity {

    @Column({unique: true})
    battleModeId: number

    @OneToMany(
        type => Battle,
        battle => battle.battleMode
    )
    battle: Battle;

}

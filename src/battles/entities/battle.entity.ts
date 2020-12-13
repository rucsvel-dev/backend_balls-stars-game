import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import {IsBoolean, IsNumber, IsString} from 'class-validator';

import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import {BattleMode} from "./battleMode.entity";

@Entity()
export class Battle extends CoreEntity {

    @Column({default: null})
    @IsBoolean()
    isVictory: boolean

    @ManyToOne(
        type => BattleMode,
        battleMode => battleMode.battle
    )
    battleMode: BattleMode

    @ManyToOne(
        type => User,
        user => user.battles
    )
    user: User;

}

import { Column, Entity, ManyToOne } from 'typeorm';

import { IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";
import {Clan} from "./clan.entity";
import {User} from "../../users/entities/user.entity";


@Entity()
export class ClanMessage extends CoreEntity {

    @Column()
    @IsString()
    message: string

    @ManyToOne(
        type => User,
        user => user.clanMessages
    )
    user: User

    @ManyToOne(
        type => Clan,
        clan => clan.messages
    )
    clan: Clan
}

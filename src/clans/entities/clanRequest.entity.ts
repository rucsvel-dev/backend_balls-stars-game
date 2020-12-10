import { Column, Entity, ManyToOne } from 'typeorm';

import { IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";
import {Clan} from "./clan.entity";
import {User} from "../../users/entities/user.entity";


@Entity()
export class ClanRequest extends CoreEntity {

    @ManyToOne(
        type => User,
        user => user.clanRequests
    )
    user: User

    @Column()
    @IsString()
    message: string

    @ManyToOne(
        type => Clan,
        clan => clan.requests
    )
    clan: Clan
}

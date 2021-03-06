import { Column, Entity, ManyToOne } from 'typeorm';

import {IsBoolean, IsString} from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";
import {Clan} from "./clan.entity";
import {User} from "../../users/entities/user.entity";


@Entity()
export class ClanRequest extends CoreEntity {

    @Column()
    @IsString()
    message: string

    @Column({ default: null })
    @IsBoolean()
    isAccepted: boolean

    @ManyToOne(
        type => User,
        user => user.clanRequests
    )
    user: User

    @ManyToOne(
        type => Clan,
        clan => clan.requests
    )
    clan: Clan
}

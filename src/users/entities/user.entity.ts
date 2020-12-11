import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";
import {Clan} from "../../clans/entities/clan.entity";
import {ClanRequest} from "../../clans/entities/clanRequest.entity";
import {ClanMessage} from "../../clans/entities/clanMessage.entity";


@Entity()
export class User extends CoreEntity {
    @Column({ unique: true })
    @IsEmail()
    email: string;

    // @Column({ select: false })
    // @IsString()
    // password: string;

    @Column({ default: null })
    @IsString()
    googleId: string;

    @Column({ default: false })
    @IsBoolean()
    verified: boolean;

    @ManyToOne(
        type => Clan,
        clan => clan.members
    )
    clan: Clan

    @OneToMany(
        type => ClanRequest,
        clanRequest => clanRequest.user
    )
    clanRequests: ClanRequest[]

    @OneToMany(
        type => ClanMessage,
        clanMessage => clanMessage.user
    )
    clanMessages: ClanMessage[]
}

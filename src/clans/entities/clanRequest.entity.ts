import { Column, Entity, ManyToOne } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";
import {Clan} from "./clan.entity";


@Entity()
export class ClanRequest extends CoreEntity {

    @Column()
    @IsString()
    message: string

    @Column()
    @ManyToOne(
        type => Clan,
        clan => clan.requests
    )
    clan: ClanRequest[]
}

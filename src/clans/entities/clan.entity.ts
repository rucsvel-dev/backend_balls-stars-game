import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";
import {User} from "../../users/entities/user.entity";
import {ClanRequest} from "./clanRequest.entity";


@Entity()
export class Clan extends CoreEntity {
    @Column({ unique: true })
    @IsString()
    owner: string;

    @Column({ unique: true })
    @IsString()
    name: string;

    @Column({ select: false })
    @IsString()
    description: string;

    @Column({ default: null })
    @IsString()
    logo: string;

    @Column({ default: true })
    @IsBoolean()
    isPublic:boolean

    @Column()
    @OneToMany(
        type => User,
        user => user.clan
    )
    members: User[]

    @Column()
    @OneToMany(
        type => ClanRequest,
        clanRequest => clanRequest.clan
    )
    requests: ClanRequest[]
}

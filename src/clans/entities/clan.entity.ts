import { Column, Entity, OneToMany } from 'typeorm';

import {IsBoolean, IsNumber, IsString} from 'class-validator';
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import { ClanRequest } from "./clanRequest.entity";
import {ClanMessage} from "./clanMessage.entity";


@Entity()
export class Clan extends CoreEntity {
    @Column({ unique: true })
    @IsNumber()
    ownerId: number;

    @Column({ unique: true })
    @IsString()
    name: string;

    @Column()
    @IsString()
    description: string;

    @Column({ default: null })
    @IsString()
    logo: string;

    @Column({ default: true })
    @IsBoolean()
    isPublic:boolean

    @OneToMany(
        type => User,
        user => user.clan
    )
    members: User[]

    @OneToMany(
        type => ClanRequest,
        clanRequest => clanRequest.clan
    )
    requests: ClanRequest[]

    @OneToMany(
        type => ClanMessage,
        clanMessage => clanMessage.clan
    )
    messages: ClanMessage[]
}

import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

import {IsBoolean, IsNumber, IsString} from 'class-validator';
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import {InternalServerErrorException} from "@nestjs/common";
import {HERO_MAX_LEVEL} from "../heroes.constants";


@Entity()
export class Hero extends CoreEntity {

    @Column({ unique: true })
    @IsNumber()
    heroId: number;

    @Column({default: 1})
    @IsNumber()
    level: number;

    @Column({default: 0})
    @IsNumber()
    experience: number

    @ManyToOne(
        type => User,
        user => user.heroes
    )
    user: User;

    async upLevel(): Promise<boolean> {
        try {
            if(this.level < HERO_MAX_LEVEL){
                this.level += 1;
                return true;
            }
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}

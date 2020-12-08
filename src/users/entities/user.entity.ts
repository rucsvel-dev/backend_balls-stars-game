import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";


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
}

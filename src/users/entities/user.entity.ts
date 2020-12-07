import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {CoreEntity} from "../../common/entities/core.entity";


// @InputType('UserInputType', { isAbstract: true })
@Entity()
export class User extends CoreEntity {
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ select: false })
    @IsString()
    password: string;

    @Column({ default: false })
    @IsBoolean()
    verified: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            } catch (e) {
                console.log(e);
                throw new InternalServerErrorException();
            }
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}

import {Column, Entity, ManyToOne, OneToMany, OneToOne} from 'typeorm';

import {IsBoolean, IsNumber, IsString} from 'class-validator';
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import {Item} from "./item.entity";

@Entity()
export class Inventory extends CoreEntity {

    @OneToMany(
        type => Item,
        item => item.inventory
    )
    items: Item[]

    @OneToOne(
        type => User,
        user => user.inventory
    )
    user: User;
}

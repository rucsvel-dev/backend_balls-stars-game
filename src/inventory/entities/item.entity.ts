import {Column, Entity, ManyToOne} from 'typeorm';

import {IsBoolean, IsNumber, IsString} from 'class-validator';
import { CoreEntity } from "../../common/entities/core.entity";
import {Hero} from "../../heroes/entities/hero.entity";
import {Inventory} from "./inventory.entity";

@Entity()
export class Item extends CoreEntity {

    @Column()
    @IsNumber()
    itemId: number

    @Column({default: 3})
    @IsNumber()
    itemLevel: 1 | 2 | 3

    @ManyToOne(
        type => Inventory,
        inventory => inventory.items
    )
    inventory: Inventory

}

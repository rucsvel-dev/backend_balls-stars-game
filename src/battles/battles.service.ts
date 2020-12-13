import { Injectable } from '@nestjs/common';

import {User} from "../users/entities/user.entity";
import {AddBattleToUserDto, AddBattleToUserOutput} from "./dtos/add-battle-to-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Battle} from "./entities/battle.entity";

@Injectable()
export class BattlesService {

    constructor(
        @InjectRepository(Battle) private readonly battlesRepository: Repository<Battle>,
    ) {
    }

    async addBattleToUser(
        addBattleToUserDto: AddBattleToUserDto,
        user: User
    ): Promise<AddBattleToUserOutput>{
        try {
            return { ok: true }
        } catch (err){
            return { ok: false, error: '' }
        }
    }

}

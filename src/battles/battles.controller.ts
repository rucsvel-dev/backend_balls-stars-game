import {Controller, Post} from '@nestjs/common';

import {BattlesService} from "./battles.service";
import {User} from "../users/entities/user.entity";
import {GetUser} from "../auth/get-user.decorator";
import {AddBattleToUserDto, AddBattleToUserOutput} from "./dtos/add-battle-to-user.dto";

@Controller('battles')
export class BattlesController {

    constructor(
        private readonly heroesService: BattlesService
    ) {
    }

    @Post('addBattleToUser')
    addBattleToUser(
        addBattleToUserDto: AddBattleToUserDto,
        @GetUser() user: User
    ): Promise<AddBattleToUserOutput>{
        return this.heroesService.addBattleToUser(addBattleToUserDto, user);
    }

}

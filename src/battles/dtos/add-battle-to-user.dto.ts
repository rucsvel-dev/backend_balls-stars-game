import {IsNotEmpty, IsNumber} from 'class-validator';

import {CoreOutput} from "../../common/dtos/output.dto";

export class AddBattleToUserDto {
    @IsNotEmpty()
    @IsNumber()
    battleModeId: number

    @IsNotEmpty()
    @IsNumber()
    userId: number
}

export class AddBattleToUserOutput extends CoreOutput {}

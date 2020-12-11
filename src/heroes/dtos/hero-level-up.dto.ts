import {IsNotEmpty, IsNumber} from 'class-validator';

import {CoreOutput} from "../../common/dtos/output.dto";

export class HeroLevelUpDto {
    @IsNotEmpty()
    @IsNumber()
    heroId: number
}

export class HeroLevelUpOutput extends CoreOutput {}

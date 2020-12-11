import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

import {Clan} from "../entities/clan.entity";
import {CoreOutput} from "../../common/dtos/output.dto";

export class JoinToClanDto {
    @IsNumber()
    clanId: number

    @IsString()
    message: string
}

export class JoinToClanOutput extends CoreOutput {
    @IsString()
    message?:string
}

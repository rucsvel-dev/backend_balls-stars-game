import { IsNotEmpty } from 'class-validator';

import {Clan} from "../entities/clan.entity";
import {CoreOutput} from "../../common/dtos/output.dto";

export class CreateClanDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    description: string

    logo: string

    isPublic: boolean
}

export class CreateClanOutput extends CoreOutput {
    clan?: Clan
}

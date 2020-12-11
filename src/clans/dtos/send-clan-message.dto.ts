import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

import {Clan} from "../entities/clan.entity";
import {CoreOutput} from "../../common/dtos/output.dto";
import {ClanMessage} from "../entities/clanMessage.entity";

export class SendClanMessageDto {
    @IsString()
    @IsNotEmpty()
    message: string
}

export class SendClanMessageOutput extends CoreOutput {
    message?: ClanMessage
}

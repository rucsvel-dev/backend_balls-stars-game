import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

import {CoreOutput} from "../../common/dtos/output.dto";
import {User} from "../entities/user.entity";

export class GoogleConnectDto {
    @IsString()
    googleId:string

    @IsString()
    email: string
}

export class GoogleConnectOutput extends CoreOutput {
    @IsString()
    token?: string
}

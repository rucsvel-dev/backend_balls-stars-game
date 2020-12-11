import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

import {CoreOutput} from "../../common/dtos/output.dto";
import {User} from "../entities/user.entity";

export class GetAllUsersDto {
    @IsString()
    email: string
}

export class GetAllUsersOutput extends CoreOutput {}

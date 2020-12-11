import {IsNotEmpty, IsNumber} from 'class-validator';

import {CoreOutput} from "../../common/dtos/output.dto";
import {User} from "../entities/user.entity";

export class GetAllUsersOutput extends CoreOutput {
    users?: User[]
}

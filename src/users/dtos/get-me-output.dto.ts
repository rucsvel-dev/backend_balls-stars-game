
import {CoreOutput} from "../../common/dtos/output.dto";
import {User} from "../entities/user.entity";

export class GetMeDto {}

export class GetMeOutput extends CoreOutput {
    user?: User
}

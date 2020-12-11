import {Clan} from "../entities/clan.entity";
import {CoreOutput} from "../../common/dtos/output.dto";

export class GetClansOutput extends CoreOutput {
    clans?:Clan[]
}

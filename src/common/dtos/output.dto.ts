import {IsNotEmpty} from "class-validator";

export class CoreOutput {

    error?: string;

    @IsNotEmpty()
    ok: boolean;
}

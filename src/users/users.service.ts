import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) {}

    async getAllUsers(){
        try {
            return await this.usersRepository.find();
        }catch (err){

        }
    }
}

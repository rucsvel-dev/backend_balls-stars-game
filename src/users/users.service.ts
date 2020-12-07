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
            const users = await this.usersRepository.find();
            return { ok: true, users }
        }catch (err){
            return { ok: false, error: 'Users not found' };
        }
    }

    async findById(id: number){
        try {
            const user = await this.usersRepository.findOneOrFail({ id });
            return {
                ok: true,
                user,
            };
        } catch (error) {
            return { ok: false, error: 'User Not Found' };
        }
    }

    async createUserByEmail(createUserBody){
        try {
            const exists = await this.usersRepository.findOne({ email: createUserBody.email });
            if (exists) {
                return { ok: false, error: 'There is a user with that email already' };
            }
            const user = await this.usersRepository.save(
                this.usersRepository.create(createUserBody),
            );
            return { ok: true };
        }catch (err){
            return { ok: false, error: 'Cannot create the user' };
        }
    }

    async googleConnect(createUserBody){
        try {
            const exists = await this.usersRepository.findOne({ email: createUserBody.email });
            if (exists) {
                // do connect google
                return { ok: false, error: 'There is a user with that email already' };
            } else{
                const user = await this.usersRepository.save(
                    this.usersRepository.create(createUserBody),
                );
            }
            return { ok: true };
        }catch (err){
            return { ok: false, error: 'Cannot connect the user' };
        }
    }
}

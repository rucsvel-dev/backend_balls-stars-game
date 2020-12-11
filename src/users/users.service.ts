import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "../jwt/jwt.service";
import {GetAllUsersOutput} from "./dtos/get-all-users.dto";
import {GetAllUsersDto} from "./dtos/create-user-by-email.dto";
import {GoogleConnectDto, GoogleConnectOutput} from "./dtos/google-connect.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async getAllUsers(): Promise<GetAllUsersOutput>{
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

    async createUserByEmail(getAllUsersDto: GetAllUsersDto): Promise<GetAllUsersOutput>{
        try {
            const exists = await this.usersRepository.findOne({ email: getAllUsersDto.email });
            if (exists) {
                return { ok: false, error: 'There is a user with that email already' };
            }
            await this.usersRepository.save(
                this.usersRepository.create(getAllUsersDto),
            );
            return { ok: true };
        }catch (err){
            return { ok: false, error: 'Cannot create the user' };
        }
    }

    async googleConnect(googleConnectDto: GoogleConnectDto): Promise<GoogleConnectOutput>{
        try {
            const existsUser = await this.usersRepository.findOne({ email: googleConnectDto.email });
            if (existsUser) {
                const token = this.jwtService.sign(existsUser.id)
                return { ok: false, token };
            } else{
                const user = await this.usersRepository.save(
                    this.usersRepository.create(googleConnectDto),
                );
            }
            return { ok: true };
        }catch (err){
            return { ok: false, error: 'Cannot connect the user' };
        }
    }
}

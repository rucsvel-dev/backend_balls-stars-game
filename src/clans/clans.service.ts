import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "../jwt/jwt.service";
import {Clan} from "./entities/clan.entity";
import {CreateClanDto, CreateClanOutput} from "./dtos/create-account.dto";

@Injectable()
export class ClansService {
    constructor(
        @InjectRepository(Clan) private readonly clansRepository: Repository<Clan>,
    ) {
    }

    async createClan(
        createClanDto: CreateClanDto
    ): Promise<CreateClanOutput>
    {
        try {
            const exists = await this.clansRepository.findOne({ name: createClanDto.name });
            if (exists) {
                return { ok: false, error: 'There is a clan with that name already' };
            }
            const clan = await this.clansRepository.save(
                this.clansRepository.create(createClanDto),
            );
            return { ok: true, clan };
        }catch (err){
            return { ok: false, error: 'Cannot create the clan' };
        }
    }

}

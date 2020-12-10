import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {Clan} from "./entities/clan.entity";
import {CreateClanDto, CreateClanOutput} from "./dtos/create-clan.dto";
import {JoinToClanDto, JoinToClanOutput} from "./dtos/joinToClan.dto";
import {ClanRequest} from "./entities/clanRequest.entity";

@Injectable()
export class ClansService {
    constructor(
        @InjectRepository(Clan) private readonly clansRepository: Repository<Clan>,
        @InjectRepository(Clan) private readonly clanRequestsRepository: Repository<ClanRequest>,
    ) {
    }

    async createClan(
        createClanDto: CreateClanDto,
        user: User
    ): Promise<CreateClanOutput>
    {
        try {
            const exists = await this.clansRepository.findOne({ name: createClanDto.name });
            if (exists) {
                return { ok: false, error: 'There is a clan with that name already' };
            }
            const clan = await this.clansRepository.save(
                this.clansRepository.create({ ownerId: user.id, ...createClanDto }),
            );
            return { ok: true, clan };
        }catch (err){
            return { ok: false, error: 'Cannot create the clan' };
        }
    }

    async joinToClan(
        joinToClanDto: JoinToClanDto,
        user: User
    ): Promise<JoinToClanOutput>{
        try {
            let message = '';
            const clan = await this.clansRepository.findOne({ id: joinToClanDto.clanId });
            if (!clan) {
                return { ok: false, error: 'There is a clan with that id does not exist' };
            }
            if(clan.isPublic){
                clan.members.push(user);
                message = 'Clan joined';
            }else{
                const clanRequest = await this.clanRequestsRepository.save(
                    this.clanRequestsRepository.create({ user, message: joinToClanDto.message, clan }),
                );
                clan.requests.push(clanRequest);
                await this.clanRequestsRepository.save(clan)
                message = 'Request created';
            }
            return { ok: true, message };
        }catch (err){
            return { ok: false, error: 'Cannot join to clan' };
        }
    }

}

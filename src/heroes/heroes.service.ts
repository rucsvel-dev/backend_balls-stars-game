import { Injectable } from '@nestjs/common';
import {User} from "../users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Hero} from "./entities/hero.entity";
import {HeroLevelUpDto} from "./dtos/hero-level-up.dto";
import {LEVEL_EXPERIENCE_COUNT} from "./heroes.constants";

@Injectable()
export class HeroesService {
    constructor(
        @InjectRepository(Hero) private readonly heroesRepository: Repository<Hero>,
    ) {
    }

    async getMyHeroes(user: User){
        try {
            const heroes = await this.heroesRepository.find({
                where: { user }
            })
            return { ok: true, heroes }
        }catch (err){
            return {ok: false, error: 'Cannot get user heroes'}
        }
    }

    async addHeroToUser(){
        try {
            return { ok: true }
        }catch (err){
            return { ok: false, error: 'failed to add' }
        }
    }

    async heroLevelUp(
        heroLevelUpDto: HeroLevelUpDto,
        user: User
    ){
        try {
            const hero = await this.heroesRepository.findOne({
                where: {
                    user,
                    heroId: heroLevelUpDto.heroId
                }
            });
            if(this.isEnoughExperience(hero)){
                await hero.upLevel();
            }else{
                return { ok: false, error: 'Not enough experience' }
            }
            await this.heroesRepository.save(hero);
            return { ok: true, hero };
        }catch (err){
            return { ok: false, error: 'Cannot up the level' }
        }
    }

    private isEnoughExperience(hero: Hero): boolean{
        return hero.experience >= LEVEL_EXPERIENCE_COUNT['level' + (hero.level + 1)];
    }

}

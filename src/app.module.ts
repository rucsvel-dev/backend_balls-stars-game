import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScheduleModule} from "@nestjs/schedule";
import * as Joi from 'joi';

import { UsersModule } from './users/users.module';
import {User} from "./users/entities/user.entity";
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { ClansModule } from './clans/clans.module';
import {Clan} from "./clans/entities/clan.entity";
import {ClanRequest} from "./clans/entities/clanRequest.entity";
import {ClanMessage} from "./clans/entities/clanMessage.entity";
import { HeroesModule } from './heroes/heroes.module';
import {Hero} from "./heroes/entities/hero.entity";
import { BattlesModule } from './battles/battles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.dev.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid('dev', 'prod', 'test')
            .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required()
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
          process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        User,
        Clan,
        ClanRequest,
        ClanMessage,
        Hero
      ],
    }),
    ScheduleModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    UsersModule,
    JwtModule,
    AuthModule,
    ClansModule,
    HeroesModule,
    BattlesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

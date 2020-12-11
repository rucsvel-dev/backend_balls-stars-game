import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';

import { UsersService } from './users.service';
import {AuthGuard} from "../auth/auth.guard";
import {GetAllUsersOutput} from "./dtos/get-all-users.dto";
import {GetAllUsersDto} from "./dtos/create-user-by-email.dto";
import {GoogleConnectDto} from "./dtos/google-connect.dto";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllUsers(): Promise<GetAllUsersOutput>{
        return this.usersService.getAllUsers();
    }

    @Post('createUserByEmail')
    createUserByEmail(
        @Body() getAllUsersDto: GetAllUsersDto
    ): Promise<GetAllUsersOutput>{
        return this.usersService.createUserByEmail(getAllUsersDto);
    }

    @Post('googleConnect')
    googleConnect(
        @Body() googleConnectDto: GoogleConnectDto
    ){
        return this.usersService.googleConnect(googleConnectDto);
    }
}

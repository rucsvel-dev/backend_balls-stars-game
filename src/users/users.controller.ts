import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';

import { UsersService } from './users.service';
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllUsers(){
        return this.usersService.getAllUsers();
    }

    @Post('createUserByEmail')
    createUser(@Body() createUserBody){
        return this.usersService.createUserByEmail(createUserBody);
    }

    @Post('googleConnect')
    googleConnect(@Body() createUserBody){
        return this.usersService.googleConnect(createUserBody);
    }
}

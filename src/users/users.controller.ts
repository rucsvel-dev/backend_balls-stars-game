import {Body, Controller, Get, Post} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @Get()
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

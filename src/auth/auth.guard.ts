import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {UsersService} from "../users/users.service";
import {JwtService} from "../jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private async validateRequest(request: Request): Promise<boolean>{
        const token = request.headers['jwt'];
        if (token) {
            try {
                const decoded = this.jwtService.verify(token.toString());
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const { user } = await this.usersService.findById(decoded['id']);
                    if (user) {
                        request['user'] = user;
                        return true
                    }
                }
            } catch (err){
                return false
            }
        }
        return false
    }
}

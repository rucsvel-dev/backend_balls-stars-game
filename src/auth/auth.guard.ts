import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    private validateRequest(request: Request): boolean{
        console.log(request)
        // const token = request.body['token'];
        // if (token) {
        //     const decoded = this.jwtService.verify(token.toString());
        //     if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        //         const { user } = await this.userService.findById(decoded['id']);
        //         if (user) {
        //             request.body['user'] = user;
        //             return true
        //         }
        //     }
        // }
        return true
    }
}

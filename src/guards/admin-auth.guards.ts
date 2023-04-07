import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan 1",
      });
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ 
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan 2",
      });
    }
    let user: any;
    console.log();
    try {
      user = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      console.log(user);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan 3",
      });
    }
    if (!user.is_owner) {
      throw new UnauthorizedException({
        message: 'Foydalanuvchi admin emas',
      });
    }
    req.user = user;
    return true;
  }
}

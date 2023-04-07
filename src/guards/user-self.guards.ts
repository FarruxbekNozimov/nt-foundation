import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (String(req.user.id) !== req.user.id) {
      throw new UnauthorizedException({
        message: 'Ruxsat etilmagan foydalanuvchi',
      });
    }
    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const headerValue = req.headers["x-admin-key"] ?? req.headers.authorization;
    const expectedKey = process.env.ADMIN_API_KEY;

    if (!expectedKey) {
      throw new UnauthorizedException("ADMIN_API_KEY is not configured.");
    }

    const providedKey = Array.isArray(headerValue) ? headerValue[0] : headerValue;
    const normalized = providedKey?.startsWith("Bearer ") ? providedKey.slice(7) : providedKey;

    if (normalized !== expectedKey) {
      throw new UnauthorizedException("Invalid admin credentials.");
    }

    return true;
  }
}

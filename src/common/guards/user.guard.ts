import {
	BadRequestException,
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new UnauthorizedException("Unauthorized user");
		}
		const [bearer, token] = authHeader.split(" ");
		if (bearer !== "Bearer" || !token) {
			throw new UnauthorizedException("Unauthorized user");
		}
		async function verify(token: string, jwtService: JwtService) {
			let payload: any;
			try {
				payload = await jwtService.verify(token, {
					secret: process.env.ACCESS_TOKEN_KEY,
				});
			} catch (error) {
				throw new BadRequestException(error);
			}
			if (!payload) {
				throw new UnauthorizedException("Unauthorized user");
			}
			if (!payload.is_active) {
				throw new UnauthorizedException("Not allowed");
			}
			req.user = payload;
			return true;
		}
		return verify(token, this.jwtService);
	}
}

import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Res,
} from "@nestjs/common";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { SignInDTo } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post("sign-up")
	async signUp(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto);
	}
	@Post("sign-in")
	async signIn(
		@Body() signInDto: SignInDTo,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.signIn(signInDto, res);
	}
	@HttpCode(200)
	@Post("sign-out")
	signOut(
		@CookieGetter("refresh_token") refreshToken: string,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.signOut(refreshToken, res);
	}
	@HttpCode(200)
	@Get(":id/refresh")
	async updateRefreshToken(
		@Res({ passthrough: true }) res: Response,
		@CookieGetter("refresh_token") refresh_token: string,
		@Param("id", ParseIntPipe) id: number
	) {
		return this.authService.updateRefreshToken(id, refresh_token, res);
	}
}

import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { SignInDTo } from "./dto/sign-in.dto";
@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}
	async generateTokens(user: User) {
		const payload = {
			id: user.id,
			is_active: user.is_active,
			is_owner: user.is_owner,
		};
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: process.env.ACCESS_TOKEN_KEY,
				expiresIn: process.env.ACCESS_TOKEN_TIME,
			}),
			this.jwtService.signAsync(payload, {
				secret: process.env.REFRESH_TOKEN_KEY,
				expiresIn: process.env.REFRESH_TOKEN_TIME,
			}),
		]);
		return {
			accessToken,
			refreshToken,
		};
	}
	async signUp(createUserDto: CreateUserDto) {
		const candidate = await this.usersService.findByEmail(createUserDto.email);
		if (candidate) {
			throw new ConflictException({
				message: "This email already exisits",
			});
		}
		const newUser = await this.usersService.create(createUserDto);
		return { message: "User created", userId: newUser.id };
	}
	async signIn(signInDto: SignInDTo, res: Response) {
		const user = await this.usersService.findByEmail(signInDto.email);
		if (!user) {
			throw new BadRequestException({
				message: "Invalid password or email",
			});
		}
		if (!user.is_active) {
			throw new BadRequestException({
				message: "Activate your accont",
			});
		}
		const isValidPassword = await bcrypt.compare(
			signInDto.password,
			user.hashshed_password
		);
		if (!isValidPassword) {
			throw new BadRequestException({
				message: "Invalid password or email",
			});
		}
		const { accessToken, refreshToken } = await this.generateTokens(user);
		res.cookie("refresh_token", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		user.hashshed_refresh_token = await bcrypt.hash(refreshToken, 7);
		await user.save();
		return {
			message: "Welcome!!!",
			accessToken,
		};
	}
	async updateRefreshToken(
		userId: number,
		refresh_token: string,
		res: Response
	) {
		const decodedToken = await this.jwtService.decode(refresh_token);
		if (userId !== decodedToken["id"]) {
			throw new ForbiddenException("Not allowed");
		}
		const user = await this.usersService.findOne(userId);
		if (!user || !user.hashshed_refresh_token) {
			throw new NotFoundException("User not found");
		}
		const tokenMatch = await bcrypt.compare(
			refresh_token,
			user.hashshed_refresh_token
		);
		if (!tokenMatch) {
			throw new ForbiddenException("Foribidden");
		}
		const { accessToken, refreshToken } = await this.generateTokens(user);
		const hashshed_refresh_token = await bcrypt.hash(refreshToken, 7);
		await this.usersService.updateRefreshToken(user.id, hashshed_refresh_token);
		res.cookie("refresh_token", refreshToken, {
			maxAge: Number(process.env.COOKIE_TIME),
			httpOnly: true,
		});
		const response = {
			message: "User refresh token refreshed",
			userId: user.id,
			access_token: accessToken,
		};
		return response;
	}
	async signOut(refreshToken: string, res: Response) {
		const userData = await this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_KEY,
		});
		if (!userData) {
			throw new ForbiddenException("User not verified!");
		}
		const hashshed_refresh_token = null;
		await this.usersService.updateRefreshToken(
			userData.id,
			hashshed_refresh_token!
		);
		res.clearCookie("refresh_token");
		const response = {
			message: "User logged out successfully",
		};
		return response;
	}
}

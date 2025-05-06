import {
	BadRequestException,
	Injectable,
	ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import * as otpGenerator from "otp-generator";
import { BotService } from "../bot/bot.service";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.model";
@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userModel: typeof User,
		private readonly mailService: MailService,
		private readonly botService: BotService
	) {}
	async create(createUserDto: CreateUserDto) {
		const { password, confirm_password } = createUserDto;
		if (password !== confirm_password) {
			throw new BadRequestException({
				message: "password and confirm password not matched",
			});
		}
		const hashshed_password = await bcrypt.hash(password, 7);
		const newUser = await this.userModel.create({
			...createUserDto,
			hashshed_password,
		});
		try {
			await this.mailService.sendMail(newUser);
		} catch (error) {
			console.log(error);
			throw new ServiceUnavailableException({
				message: "Error on sending activation to email",
			});
		}
		return newUser;
	}

	findAll() {
		return this.userModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.userModel.findByPk(id, { include: { all: true } });
	}
	findByEmail(email: string) {
		return this.userModel.findOne({ where: { email } });
	}
	update(id: number, updateUserDto: UpdateUserDto) {
		return this.userModel.update;
	}

	remove(id: number) {
		return this.userModel.destroy({ where: { id } });
	}
	async activateUser(link: string) {
		if (!link) {
			throw new BadRequestException({
				message: "Activation link not found",
			});
		}
		const updatedUser = await this.userModel.update(
			{ is_active: true },
			{ where: { activation_link: link, is_active: false }, returning: true }
		);
		if (!updatedUser[1][0]) {
			throw new BadRequestException({
				message: "User already activated",
			});
		}
		return {
			message: "User successfully activated!",
			is_active: updatedUser[1][0].is_active,
		};
	}
	async updateRefreshToken(id: number, hashshed_refresh_token: string) {
		const updatedUser = await this.userModel.update(
			{ hashshed_refresh_token },
			{ where: { id } }
		);
		return updatedUser;
	}
	async newOtp(phoneUserDto: PhoneUserDto) {
		const phone_number = phoneUserDto.phone;
		const otp = otpGenerator.generate(4, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		// -------------------BOT----------------------
		const isSend = await this.botService.sendOtp(phone_number, otp);
		if (!isSend) {
			throw new BadRequestException("Register from bot");
		}
		return {
			message: "OTP sent to bot",
		};
	}
}

import {
	BadRequestException,
	Injectable,
	ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import * as otpGenerator from "otp-generator";
import * as uuid from "uuid";
import { BotService } from "../bot/bot.service";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { decode, encode } from "../common/helpers/crypto";
import { MailService } from "../mail/mail.service";
import { SmsService } from "../sms/sms.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { VerifyOtpDto } from "./dto/verify-user.dto";
import { Otp } from "./models/otp.model";
import { User } from "./models/user.model";
@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userModel: typeof User,
		@InjectModel(Otp) private readonly otpModel: typeof Otp,
		private readonly mailService: MailService,
		private readonly botService: BotService,
		private readonly smsService: SmsService
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
		// const isSend = await this.botService.sendOtp(phone_number, otp);
		// if (!isSend) {
		// 	throw new BadRequestException("Register from bot");
		// }

		// -------------SMS--------------------
		const response = await this.smsService.sendSms(phone_number, otp);
		if (response.status !== 200) {
			throw new ServiceUnavailableException("Error on sending otp");
		}
		const message =
			`Otp code has been send to ****` +
			phone_number.slice(phone_number.length - 4);
		const now = new Date();
		const expirtion_time = AddMinutesToDate(now, 5);
		await this.otpModel.destroy({ where: { phone_number } });
		const newOtpData = await this.otpModel.create({
			id: uuid.v4(),
			otp,
			phone_number,
			expirtion_time,
		});
		const details = {
			timestamp: now,
			phone_number,
			otp_id: newOtpData.id,
		};
		const encodedData = await encode(JSON.stringify(details));
		return {
			message: "OTP botga yuborildi",
			verificationKey: encodedData,
			messageSms: message,
		};
	}
	async verifyOtp(verifyOtpDto: VerifyOtpDto) {
		const { verification_key, phone: phone_number, otp } = verifyOtpDto;
		const currentDate = new Date();
		const decodedData = await decode(verification_key);
		const details = JSON.parse(decodedData);
		if (details.phone_number != phone_number) {
			throw new BadRequestException("Otp not sent to this phone number");
		}
		const resultOtp = await this.otpModel.findByPk(details.otp_id);
		if (resultOtp == null) {
			throw new BadRequestException("No such otp found");
		}
		if (resultOtp.verified) {
			throw new BadRequestException("Otp already checked");
		}
		if (resultOtp.expirtion_time < currentDate) {
			throw new BadRequestException("Otp expired");
		}
		if (resultOtp.otp != otp) {
			throw new BadRequestException("Otp not matched");
		}
		const user = await this.userModel.update(
			{
				is_owner: true,
			},
			{ where: { phone: phone_number }, returning: true }
		);
		if (!user[1][0]) {
			throw new BadRequestException("User not found");
		}
		await this.otpModel.update(
			{ verified: true },
			{ where: { id: details.otp_id } }
		);
		return {
			message: "Congrats the 'owner' role added to your roles",
		};
	}
}

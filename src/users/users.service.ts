import {
	BadRequestException,
	Injectable,
	ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./models/user.model";
@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userModel: typeof User,
		private readonly mailService: MailService
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
}

import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/models/user.model";

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}
	async sendMail(user: User) {
		const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
		await this.mailerService.sendMail({
			to: user.email,
			subject: "Welcome to 'Discount' App",
			template: "./confirmation",
			context: {
				name: user.name,
				url,
			},
		});
	}
}
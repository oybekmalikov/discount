import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { MailService } from "./mail.service";

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get<string>("SMTP_HOST"),
					secure: false,
					auth: {
						user: config.get<string>("SMTP_USER"),
						pass: config.get<string>("SMTP_PASSWORD"),
					},
				},
				defaults: {
					from: `'Discount' <${config.get<string>("SMTP_HOST")}>`,
				},
				template: {
					dir: join(__dirname, "templates"),
					adapter: new HandlebarsAdapter(),
					template: "confirmation",
					options: {
						strict: true,
					},
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}

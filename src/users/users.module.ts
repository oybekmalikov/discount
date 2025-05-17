import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BotModule } from "../bot/bot.module";
import { MailModule } from "../mail/mail.module";
import { User } from "./models/user.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Otp } from './models/otp.model'
import { SmsModule } from '../sms/sms.module'

@Module({
	imports: [SequelizeModule.forFeature([User,Otp]), MailModule, BotModule,SmsModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}

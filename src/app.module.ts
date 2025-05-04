import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { AuthModule } from "./auth/auth.module";
import { BotModule } from "./bot/bot.module";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/model/district.model";
import { MailModule } from "./mail/mail.module";
import { Region } from "./region/models/region.model";
import { RegionModule } from "./region/region.module";
import { Status } from "./status/models/status.model";
import { StatusModule } from "./status/status.module";
import { Store } from "./store/models/store.model";
import { StoreModule } from "./store/store.module";
import { User } from "./users/models/user.model";
import { UsersModule } from "./users/users.module";
@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		TelegrafModule.forRootAsync({
			botName: BOT_NAME,
			useFactory: () => ({
				token: process.env.BOT_TOKEN!,
				middlewares: [],
				include: [BotModule],
			}),
		}),
		SequelizeModule.forRoot({
			dialect: "postgres",
			host: process.env.PG_HOST,
			port: Number(process.env.PG_PORT),
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
			models: [User, Region, District, Status, Store],
			autoLoadModels: true,
			sync: { alter: true },
			logging: false,
		}),
		UsersModule,
		AuthModule,
		MailModule,
		BotModule,
		RegionModule,
		DistrictModule,
		StoreModule,
		StatusModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

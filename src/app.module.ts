import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { TelegrafModule } from "nestjs-telegraf";
import { AdsModule } from "./ads/ads.module";
import { Ads } from "./ads/models/ads.model";
import { BOT_NAME } from "./app.constants";
import { AuthModule } from "./auth/auth.module";
import { BotModule } from "./bot/bot.module";
import { Bot } from "./bot/models/bot.model";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/models/category.model";
import { DiscountsModule } from "./discounts/discounts.module";
import { Discount } from "./discounts/models/discount.model";
import { DistrictModule } from "./district/district.module";
import { District } from "./district/model/district.model";
import { FavouritesModule } from "./favourites/favourites.module";
import { Favourite } from "./favourites/models/favourite.model";
import { MailModule } from "./mail/mail.module";
import { MediaModule } from "./media/media.module";
import { Media } from "./media/models/media.model";
import { Region } from "./region/models/region.model";
import { RegionModule } from "./region/region.module";
import { Review } from "./reviews/models/review.model";
import { ReviewsModule } from "./reviews/reviews.module";
import { SocialMediaType } from "./social_media_type/models/social_media_type.model";
import { SocialMediaTypeModule } from "./social_media_type/social_media_type.module";
import { Status } from "./status/models/status.model";
import { StatusModule } from "./status/status.module";
import { Store } from "./store/models/store.model";
import { StoreModule } from "./store/store.module";
import { StoreSocialLink } from "./store_social_links/models/store_social_link.model";
import { StoreSocialLinksModule } from "./store_social_links/store_social_links.module";
import { StoreSubscribe } from "./store_subscribes/models/store_subscribe.model";
import { StoreSubscribesModule } from "./store_subscribes/store_subscribes.module";
import { Type } from "./type/models/type.model";
import { TypeModule } from "./type/type.module";
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
			models: [
				User,
				Region,
				District,
				Status,
				Store,
				Bot,
				SocialMediaType,
				StoreSocialLink,
				Category,
				Type,
				Discount,
				Media,
				Ads,
				Review,
				Favourite,
				StoreSubscribe,
			],
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
		DiscountsModule,
		SocialMediaTypeModule,
		StoreSocialLinksModule,
		TypeModule,
		CategoryModule,
		MediaModule,
		AdsModule,
		ReviewsModule,
		FavouritesModule,
		StoreSubscribesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}

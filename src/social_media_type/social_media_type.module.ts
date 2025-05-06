import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocialMediaType } from "./models/social_media_type.model";
import { SocialMediaTypeController } from "./social_media_type.controller";
import { SocialMediaTypeService } from "./social_media_type.service";

@Module({
	imports: [SequelizeModule.forFeature([SocialMediaType])],
	controllers: [SocialMediaTypeController],
	providers: [SocialMediaTypeService],
})
export class SocialMediaTypeModule {}

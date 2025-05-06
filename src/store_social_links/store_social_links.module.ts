import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StoreSocialLink } from "./models/store_social_link.model";
import { StoreSocialLinksController } from "./store_social_links.controller";
import { StoreSocialLinksService } from "./store_social_links.service";

@Module({
	imports: [SequelizeModule.forFeature([StoreSocialLink])],
	controllers: [StoreSocialLinksController],
	providers: [StoreSocialLinksService],
})
export class StoreSocialLinksModule {}

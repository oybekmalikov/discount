import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { Media } from "./models/media.model";

@Module({
	imports: [SequelizeModule.forFeature([Media])],
	controllers: [MediaController],
	providers: [MediaService],
})
export class MediaModule {}

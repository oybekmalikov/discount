import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Review } from "./models/review.model";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";

@Module({
	imports: [SequelizeModule.forFeature([Review])],
	controllers: [ReviewsController],
	providers: [ReviewsService],
})
export class ReviewsModule {}

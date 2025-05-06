import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DiscountsController } from "./discounts.controller";
import { DiscountsService } from "./discounts.service";
import { Discount } from "./models/discount.model";

@Module({
	imports: [SequelizeModule.forFeature([Discount])],
	controllers: [DiscountsController],
	providers: [DiscountsService],
})
export class DiscountsModule {}

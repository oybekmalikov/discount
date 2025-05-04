import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Store } from "./models/store.model";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";

@Module({
	imports: [SequelizeModule.forFeature([Store])],
	controllers: [StoreController],
	providers: [StoreService],
})
export class StoreModule {}

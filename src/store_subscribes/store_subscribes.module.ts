import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StoreSubscribe } from "./models/store_subscribe.model";
import { StoreSubscribesController } from "./store_subscribes.controller";
import { StoreSubscribesService } from "./store_subscribes.service";

@Module({
	imports: [SequelizeModule.forFeature([StoreSubscribe])],
	controllers: [StoreSubscribesController],
	providers: [StoreSubscribesService],
})
export class StoreSubscribesModule {}

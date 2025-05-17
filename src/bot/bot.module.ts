import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AddressService } from "./address/address.service";
import { AddressUpdate } from "./address/address.update";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { Address } from "./models/address.model";
import { Bot } from "./models/bot.model";

@Module({
	imports: [SequelizeModule.forFeature([Bot, Address])],
	controllers: [],
	providers: [BotService, AddressService, AddressUpdate, BotUpdate],
	exports: [BotService],
})
export class BotModule {}

import { Action, Command, Hears, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "../bot.service";
import { AddressService } from "./address.service";

@Update()
export class AddressUpdate {
	constructor(
		private readonly botService: BotService,
		private readonly addressService: AddressService
	) {}

	@Command("address")
	async onAddress(ctx: Context) {
		return this.addressService.onAddress(ctx);
	}
	@Hears("Add new address")
	async onAddNewAddressHears(ctx: Context) {
		return this.addressService.addNewAddress(ctx);
	}
	@Hears("My addresses")
	async onMyAddressesHears(ctx: Context) {
		return this.addressService.onMyAddressesHears(ctx);
	}
	@Action(/^loc_+\d+/)
	async onClickLocation(ctx: Context) {
		return this.addressService.onClickLocation(ctx);
	}
	@Action(/^del_+\d+/)
	async onClickDelete(ctx: Context) {
		return this.addressService.onClickDelete(ctx);
	}
}

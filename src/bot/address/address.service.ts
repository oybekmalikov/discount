import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InjectBot } from "nestjs-telegraf";
import { Context, Markup, Telegraf } from "telegraf";
import { BOT_NAME } from "../../app.constants";
import { Address } from "../models/address.model";
import { Bot } from "../models/bot.model";

@Injectable()
export class AddressService {
	constructor(
		@InjectModel(Bot) private readonly botModel: typeof Bot,
		@InjectModel(Address) private readonly addressModel: typeof Address,
		@InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
	) {}
	async onAddress(ctx: Context) {
		try {
			await ctx.replyWithHTML("Address info:", {
				...Markup.keyboard([["My addresses", "Add new address"]]).resize(),
			});
		} catch (error) {
			console.log(`Error on onAddress(): `, error);
		}
	}
	async addNewAddress(ctx: Context) {
		try {
			const user_id = ctx.from?.id;
			const user = await this.botModel.findByPk(user_id);
			if (!user || !user.status) {
				await ctx.replyWithHTML(`Please click the <b>Start</b> button.`, {
					...Markup.keyboard([[`/start`]])
						.oneTime()
						.resize(),
				});
			}
			const newAddress = await this.addressModel.create({
				user_id: user_id!,
				last_state: "name",
			});
			await ctx.replyWithHTML("Enter the new address's name:", {
				...Markup.removeKeyboard(),
			});
		} catch (error) {
			console.log(`Error on addNewAddress(): `, error);
		}
	}
	async onMyAddressesHears(ctx: Context) {
		try {
			const user_id = ctx.from?.id;
			const user = await this.botModel.findByPk(user_id);
			if (!user || !user.status) {
				await ctx.replyWithHTML(`Please click the <b>Start</b> button.`, {
					parse_mode: "HTML",
					...Markup.keyboard([[`/start`]])
						.oneTime()
						.resize(),
				});
			} else {
				const addresses = await this.addressModel.findAll({
					where: {
						user_id,
						last_state: "finish",
					},
				});
				if (!addresses.length) {
					await ctx.replyWithHTML("Addresses not found", {
						...Markup.keyboard([["My addresses", "Add new address"]]).resize(),
					});
				} else {
					addresses.forEach(async (address) => {
						await ctx.replyWithHTML(
							`<b>Address's name:</b> ${address.name}\n<b>Address:</b> ${address.address}`,
							{
								reply_markup: {
									inline_keyboard: [
										[
											{
												text: "Show location",
												callback_data: `loc_${address.id}`,
											},
											{
												text: "Delete address",
												callback_data: `del_${address.id}`,
											},
										],
									],
								},
							}
						);
					});
				}
			}
		} catch (error) {
			console.log(`Error on onMyAddressesHears(): `, error);
		}
	}
	async onClickLocation(ctx: Context) {
		try {
			const contextAction = ctx.callbackQuery!["data"];
			const contextMessage = ctx.callbackQuery!["message"];
			const addressId = contextAction.split("_")[1];
			const address = await this.addressModel.findByPk(addressId);
			await ctx.deleteMessage(contextMessage?.message_id);
			await ctx.replyWithLocation(
				Number(address?.location.split("|")[0]),
				Number(address?.location.split("|")[1])
			);
		} catch (error) {
			console.log("Error on onClickLocation(): ", error);
		}
	}
	async onClickDelete(ctx: Context) {
		try {
			const contextAction = ctx.callbackQuery!["data"];
			const addressId = contextAction.split("_")[1];
			await this.addressModel.destroy({
				where: { id: addressId },
			});
			await ctx.editMessageText("Address deleted")
		} catch (error) {
			console.log("Error on onClickDelete(): ", error);
		}
	}
}

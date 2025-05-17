import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InjectBot } from "nestjs-telegraf";
import { Op } from "sequelize";
import { Context, Markup, Telegraf } from "telegraf";
import { BOT_NAME } from "../app.constants";
import { Address } from "./models/address.model";
import { Bot } from "./models/bot.model";

@Injectable()
export class BotService {
	constructor(
		@InjectModel(Bot) private readonly botModel: typeof Bot,
		@InjectModel(Address) private readonly addressModel: typeof Address,
		@InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
	) {}
	async start(ctx: Context) {
		try {
			const user_id = ctx.from?.id;
			const user = await this.botModel.findByPk(user_id);
			if (!user) {
				await this.botModel.create({
					user_id: user_id!,
					username: ctx.from?.username!,
					first_name: ctx.from?.first_name!,
					last_name: ctx.from?.last_name!,
					lang: ctx.from?.language_code!,
				});
				await ctx.replyWithHTML(
					`📞  Please click the <b>Send Phone Number</b> button.`,
					{
						...Markup.keyboard([
							[Markup.button.contactRequest(`Send Phone Number`)],
						])
							.oneTime()
							.resize(),
					}
				);
			} else if (!user.status || !user.phone_number) {
				await ctx.replyWithHTML(
					`📞  Please click the <b>Send Phone Number</b> button.`,
					{
						...Markup.keyboard([
							[Markup.button.contactRequest(`Send Phone Number`)],
						])
							.oneTime()
							.resize(),
					}
				);
			} else {
				await ctx.replyWithHTML(
					`With this bot, you can quickly and easily get information about all stores in Uzbekistan, discounts, special events and delivery services. Follow the latest promotions, useful offers and shopping opportunities - all in one place and conveniently presented for you.`,
					{
						...Markup.removeKeyboard(),
					}
				);
			}
		} catch (error) {
			console.log(`Error on start(): `, error);
		}
	}
	async onContact(ctx: Context) {
		try {
			const user_id = ctx.from?.id;
			const user = await this.botModel.findByPk(user_id);
			if (!user) {
				await ctx.replyWithHTML(`Please click the <b>Start</b> button.`, {
					...Markup.keyboard([[`/start`]])
						.oneTime()
						.resize(),
				});
			} else if (
				"contact" in ctx.message! &&
				ctx.message.contact.user_id != user_id
			) {
				await ctx.replyWithHTML(`Please send your own phone number!`, {
					...Markup.keyboard([
						[Markup.button.contactRequest(`Send Phone Number`)],
					])
						.oneTime()
						.resize(),
				});
			} else if ("contact" in ctx.message!) {
				let phone = ctx.message.contact.phone_number;
				if (phone[0] != "+") {
					phone = "+" + phone;
				}
				user.phone_number = phone;
				user.status = true;
				await user.save();
				await ctx.replyWithHTML(
					`🎉 Congratulations, you've successfully registered!`,
					{
						...Markup.removeKeyboard(),
					}
				);
			}
		} catch (error) {
			console.log(`Error on onContact(): `, error);
		}
	}
	async onStop(ctx: Context) {
		try {
			const user_id = ctx.from?.id;
			const user = await this.botModel.findByPk(user_id);
			if (!user) {
				await ctx.replyWithHTML(`Please click the <b>Start</b> button.`, {
					...Markup.keyboard([[`/start`]])
						.oneTime()
						.resize(),
				});
			} else if (user.status) {
				user.status = false;
				user.phone_number = "null";
				await user.save();
				await ctx.replyWithHTML(
					`👋  You've leaved form bot, 🔄  If you want to reactivate, please click the <b>Start</b> button.`,
					{
						...Markup.keyboard([[`/start`]])
							.oneTime()
							.resize(),
					}
				);
			}
		} catch (error) {
			console.log(`Error on onStop(): `, error);
		}
	}
	async sendOtp(phone_number: string, OTP: string) {
		try {
			const user = await this.botModel.findOne({ where: { phone_number } });
			if (!user || !user.status) {
				return false;
			}
			await this.bot.telegram.sendMessage(user.user_id, `Verify code: ${OTP}`);
			return true;
		} catch (error) {
			console.log(`Error on sendOtp(): `, error);
		}
	}
	async onText(ctx: Context) {
		if ("text" in ctx.message!) {
			try {
				const user_id = ctx.from?.id;
				const user = await this.botModel.findByPk(user_id);
				if (!user) {
					await ctx.replyWithHTML(`Please click the <b>Start</b> button.`, {
						...Markup.keyboard([[`/start`]])
							.oneTime()
							.resize(),
					});
				} else {
					const address = await this.addressModel.findOne({
						where: {
							user_id,
							last_state: { [Op.ne]: "finish" },
						},
						order: [["id", "DESC"]],
					});
					if (address) {
						const userInput = ctx.message.text;
						switch (address.last_state) {
							case "name":
								address.name = userInput;
								address.last_state = "address";
								await address.save();
								await ctx.reply("🏡 Enter your address:", {
									parse_mode: "HTML",
									...Markup.removeKeyboard(),
								});
								break;
							case "address":
								address.address = userInput;
								address.last_state = "location";
								await address.save();
								await ctx.reply("📍 Send your address's location:", {
									parse_mode: "HTML",
									...Markup.keyboard([
										[Markup.button.locationRequest("Send location")],
									]).resize(),
								});
								break;
						}
					}
				}
			} catch (error) {
				console.log(`Error on onText(): `, error);
			}
		}
	}
	async onLocation(ctx: Context) {
		try {
			if ("location" in ctx.message!) {
				const user_id = ctx.from?.id;
				const user = await this.botModel.findByPk(user_id);
				if (!user || !user.status) {
					await ctx.replyWithHTML(`Please click the <b>Start</b> button.`, {
						...Markup.keyboard([[`/start`]])
						.oneTime()
						.resize(),
					});
				} else {
					const address = await this.addressModel.findOne({
						where: {
							user_id,
							last_state: { [Op.ne]: "finish" },
						},
						order: [["id", "DESC"]],
					});
					if (address && address.last_state == "location") {
						address.location = `${ctx.message.location.latitude}|${ctx.message.location.longitude}`;
						address.last_state = "finish";
						await address.save();
						await ctx.replyWithHTML("Address saved:", {
							parse_mode: "HTML",
							...Markup.keyboard([
								["My addresses", "Add new address"],
							]).resize(),
						});
					}
				}
			}
		} catch (error) {
			console.log(`Error on onLocation(): `, error);
		}
	}
}

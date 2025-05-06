import { Command, On, Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
	constructor(private readonly botService: BotService) {}
	@Start()
	async onStart(ctx: Context) {
		return this.botService.start(ctx);
	}
	@On("contact")
	async onContact(ctx: Context) {
		return this.botService.onContact(ctx);
	}
	@Command("stop")
	async onStop(ctx: Context) {
		return this.botService.onStop(ctx);
	}
	// @On("photo")
	// async onPhoto(@Ctx() ctx: Context) {
	// 	if ("photo" in ctx.message!) {
	// 		console.log(ctx.message.photo);
	// 		await ctx.replyWithPhoto(
	// 			String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
	// 		);
	// 	}
	// }

	// @On("video")
	// async onVideo(@Ctx() ctx: Context) {
	// 	if ("video" in ctx.message!) {
	// 		console.log(ctx.message.video);
	// 		await ctx.reply(String(ctx.message.video.width));
	// 		await ctx.replyWithVideo(String(ctx.message.video.file_id));
	// 	}
	// }

	// @On("sticker")
	// async onSticker(@Ctx() ctx: Context) {
	// 	if ("sticker" in ctx.message!) {
	// 		console.log(ctx.message.sticker);
	// 		await ctx.replyWithSticker(String(ctx.message.sticker.file_id));
	// 	}
	// }
	// @On("animation")
	// async onAnimation(@Ctx() ctx: Context) {
	// 	if ("animation" in ctx.message!) {
	// 		console.log(ctx.message.animation);
	// 		await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
	// 	}
	// }

	// @On("document")
	// async onDocument(@Ctx() ctx: Context) {
	// 	if ("document" in ctx.message!) {
	// 		console.log(ctx.message.document);
	// 		await ctx.replyWithDocument(String(ctx.message.document.file_id));
	// 	}
	// }

	// @On("contact")
	// async onContact(@Ctx() ctx: Context) {
	// 	if ("contact" in ctx.message!) {
	// 		console.log(ctx.message.contact);
	// 		await ctx.reply(String(ctx.message.contact.phone_number));
	// 	}
	// }

	// @On("location")
	// async onLocation(@Ctx() ctx: Context) {
	// 	if ("location" in ctx.message!) {
	// 		console.log(ctx.message.location);
	// 		await ctx.replyWithLocation(
	// 			ctx.message.location.latitude,
	// 			ctx.message.location.longitude
	// 		);
	// 	}
	// }
	// @On("voice")
	// async onVoice(@Ctx() ctx: Context) {
	// 	if ("voice" in ctx.message!) {
	// 		console.log(ctx.message.voice);
	// 		await ctx.replyWithVoice(ctx.message.voice.file_id);
	// 	}
	// }

	// @Hears("hi")
	// async onHearsHi(@Ctx() ctx: Context) {
	// 	await ctx.reply("catch with hears 'hi'");
	// }
	// @Command("help")
	// async onCommandHelp(@Ctx() ctx: Context) {
	// 	await ctx.reply(">>>:Info");
	// }
	// @Command("inline")
	// async onCommandInline(@Ctx() ctx: Context) {
	// 	const inlineKeyboard = [
	// 		[
	// 			{
	// 				text: "button 1",
	// 				callback_data: "button_1",
	// 			},
	// 			{
	// 				text: "button 2",
	// 				callback_data: "button_2",
	// 			},
	// 			{
	// 				text: "button 3",
	// 				callback_data: "button_3",
	// 			},
	// 		],
	// 		[
	// 			{
	// 				text: "button 4",
	// 				callback_data: "button_4",
	// 			},
	// 			{
	// 				text: "button 5",
	// 				callback_data: "button_5",
	// 			},
	// 		],
	// 		[
	// 			{
	// 				text: "button 6",
	// 				callback_data: "button_6",
	// 			},
	// 		],
	// 	];
	// 	await ctx.reply("Choose button which you need:", {
	// 		reply_markup: {
	// 			inline_keyboard: inlineKeyboard,
	// 		},
	// 	});
	// }
	// @Action("first_button")
	// async onActionBtn1(@Ctx() ctx: Context) {
	// 	await ctx.reply("btn1");
	// }
	// @Action(/^button_\d+$/)
	// async onActionAnyBtn(@Ctx() ctx: Context) {
	// 	if ("data" in ctx.callbackQuery!) {
	// 		const btnData = ctx.callbackQuery?.data;
	// 		const id = btnData.split("_")[1];
	// 		await ctx.reply(`${id} btn`);
	// 	}
	// }
	// @Command("main")
	// async onCommandMain(@Ctx() ctx: Context) {
	// 	const mainKeyboard = [
	// 		["bir", "ikki", "uch"],
	// 		["to'rt", "besh"],
	// 		["olti"],
	// 		[Markup.button.contactRequest("Send your phone number")],
	// 		[Markup.button.locationRequest("Send your location")],
	// 	];
	// 	await ctx.reply("Choose button which you need:", {
	// 		...Markup.keyboard(mainKeyboard).resize(),
	// 	});
	// }
	// @Hears("bir")
	// async onHearBir(@Ctx() ctx: Context) {
	// 	await ctx.reply("catch with hears 'bir'");
	// }
	// @On("text")
	// async onText(@Ctx() ctx: Context) {
	// 	if ("text" in ctx.message!) {
	// 		if (ctx.message.text.toLowerCase() == "hi ") {
	// 			ctx.replyWithHTML(`<b>What</b>`);
	// 		} else {
	// 			await ctx.replyWithHTML(ctx.message.text);
	// 		}
	// 	}
	// }
	// @On("message")
	// async onMessage(@Ctx() ctx: Context) {
	// 	console.log(ctx.botInfo);
	// 	console.log(ctx.chat);
	// 	console.log(ctx.chat!.id);
	// 	console.log(ctx.from);
	// }
}

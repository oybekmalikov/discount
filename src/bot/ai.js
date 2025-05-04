import { Client } from "@gradio/client";
module.exports=async function AI(msg) {
	const client = await Client.connect("");
	const result = await client.predict("/chat", {
		message: msg,
		system_message: msg,
		max_tokens: 1,
		temperature: 0.1,
		top_p: 0.1,
	});

	return result.data;
}

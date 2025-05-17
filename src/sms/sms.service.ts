import { Injectable } from "@nestjs/common";
const FormData = require("form-data");
import axios from 'axios';
@Injectable()
export class SmsService {
	async sendSms(phoneNumber: string, otp: string) {
		const data = new FormData();
		data.append("mobile_phone", phoneNumber);
		data.append("message", "Bu Eskiz dan test");
		data.append("from", "4546");
		const config = {
			method: "post",
			maxBodyLength: Infinity,
			url: process.env.SMS_SERVICE_URL,
			headers: {
				Authorization: `Bearer ${process.env.SMS_TOKEN}`,
			},
			data: data,
		};
		try {
      const response = await axios(config);
      return response;
    } catch (error) {
      return { status: 500 };
    }
	}
}

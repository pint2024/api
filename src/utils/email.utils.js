import { EMAIL_INFO } from "../data/email.data.js";

export class EmailUtils {
	static sendEmail(to, subject, text, html) {
		return {
			from: EMAIL_INFO.EMAIL, to: to, 
			subject: subject,
			text: text,
			html: html,
		};
	}
}

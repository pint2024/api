import { EMAIL_INFO } from "../constants/email.constants.js";

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

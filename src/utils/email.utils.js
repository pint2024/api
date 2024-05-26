import { EmailConstants } from "../constants/index.js";

export class EmailUtils {
	static sendEmail(to, subject, text, html) {
		return {
			from: EmailConstants.EMAIL_INFO.EMAIL, to: to, 
			subject: subject,
			text: text,
			html: html,
		};
	}
}

import nodemailer from "nodemailer";
import { Constants, EmailConstants } from "../constants/index.js";
import { Log } from "../utils/index.js";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "pintegrado298@gmail.com",
		pass: "batb rkkx tjby mlnx",
	},
});

export class EmailService {
	static #setupEmail(to = "", subject = "", text = "", html = "") {
		return {
			from: EmailConstants.EMAIL_INFO.EMAIL,
			to: to,
			subject: subject,
			text: text,
			html: html,
		};
	}

	static #sendEmail = async (to = "", subject = "", text = "", html = "") => {
		try {
			const mailOptions = this.#setupEmail(to, subject, text, html);
			const info = await transporter.sendMail(mailOptions);
			Log.email("Email enviado:", to);
		} catch (error) {
			Log.error("Erro ao enviar email: " + error);
		}
	};

	static mandaConfirmacao = async (email, nome, token) => {
		await this.#sendEmail(
			email,
			"Confirmação de Email",
			`Olá ${nome},\n\nPor favor, verifique o seu email clicando no link abaixo:\n\n${Constants.FRONTEND_URL}/verify?token=${token}`,
			`<p>Olá ${nome},</p><p>Por favor, verifique o seu email clicando no link abaixo:</p><a href="${Constants.FRONTEND_URL}/verify?token=${token}">Verificar Email</a>`
		);
	};

	static mandaNotificacao = async (email, nome) => {
		await this.#sendEmail(
			email,
			`Notificação`,
			`Olá ${nome},\n\nPor favor, verifique o seu email clicando no link abaixo:\n`,
		);
	};
}

import nodemailer from "nodemailer";
import { EmailConstants } from "../constants/index.js";
import { EmailUtils, Log } from "../utils/index.js";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: EmailConstants.EMAIL_INFO.EMAIL,
		pass: EmailConstants.EMAIL_INFO.APP_PASSWORD,
	},
});

export class EmailService {
	static sendEmail = async (user, token) => {
		const mailOptions = EmailUtils.sendEmail(
			user.email,
			"Verificação de Email",
			`Olá ${user.nome} ${user.sobrenome},\n\nPor favor, verifique o seu email clicando no link abaixo:\n\n${Constants.FRONTEND_URL}/verify?token=${token}`,
			`<p>Olá ${user.nome} ${user.sobrenome},</p><p>Por favor, verifique o seu email clicando no link abaixo:</p><a href="${Constants.FRONTEND_URL}/verify?token=${token}">Verificar Email</a>`
		);

		try {
			const info = await transporter.sendMail(mailOptions);
			Log.email("Email enviado: %s", info.messageId);
		} catch (error) {
			Log.error("Erro ao enviar email: " + error);
		}
	};
}

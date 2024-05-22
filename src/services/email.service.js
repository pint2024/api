import nodemailer from "nodemailer";
import { EMAIL_INFO } from "../data/email.data.js";
import { FRONTEND_URL } from "../data/constants.data.js";
import { EmailUtils } from "../utils/email.utils.js";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: EMAIL_INFO.EMAIL,
		pass: EMAIL_INFO.APP_PASSWORD,
	},
});

export class EmailService {
	static sendEmail = async (user, token) => {
		const mailOptions = EmailUtils.sendEmail(
			user.email,
			"Verificação de Email",
			`Olá ${user.nome} ${user.sobrenome},\n\nPor favor, verifique o seu email clicando no link abaixo:\n\n${FRONTEND_URL}/verify?token=${token}`,
			`<p>Olá ${user.nome} ${user.sobrenome},</p><p>Por favor, verifique o seu email clicando no link abaixo:</p><a href="${FRONTEND_URL}/verify?token=${token}">Verificar Email</a>`
		);

		try {
			const info = await transporter.sendMail(mailOptions);
			console.log("Email enviado: %s", info.messageId);
		} catch (error) {
			console.error("Erro ao enviar email:", error);
		}
	};
}

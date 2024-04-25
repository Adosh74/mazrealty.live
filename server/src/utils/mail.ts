import dotenv from 'dotenv';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import path from 'path';

dotenv.config();

interface ISendMailOptions {
	email: string;
	subject: string;
	template: string;
	data?: any;
}

const sendMail = async (options: ISendMailOptions) => {
	const transporter = nodemailer.createTransport({
		service: 'mandrillapp',
		host: process.env.SENDINBLUE_HOST,
		port: parseInt(process.env.SENDINBLUE_PORT || '587'),
		auth: {
			user: process.env.SENDINBLUE_USERNAME,
			pass: process.env.SENDINBLUE_PASSWORD,
		},
	});

	const { email, subject, template, data } = options;

	// get template path
	const templatePath = path.join(__dirname, `../mails/${template}`);

	// render email template with ejs
	const html = await ejs.renderFile(templatePath, data);

	const emailOptions: nodemailer.SendMailOptions = {
		from: `MAZ Realty Team 🏠 <${process.env.SENDINBLUE_EMAIL}>`,
		to: email,
		subject,
		html: html as string, // Specify the type of html as string
	};

	await transporter.sendMail(emailOptions);
};

export default sendMail;

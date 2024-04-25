import dotenv from 'dotenv';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { LOGGER } from '../logging';

dotenv.config();

const mailgunDomain = process.env.MAILGUN_DOMAIN;
const mailgunApiKey = process.env.MAILGUN_API_KEY3;

if (mailgunDomain === undefined || mailgunApiKey === undefined) {
	LOGGER.error('MAILGUN_DOMAIN or MAILGUN_API_KEY is not defined');
	process.exit(1);
}
const mailgun = new Mailgun(formData);

const client = mailgun.client({ username: 'api', key: mailgunApiKey });

interface IEmailOptions {
	from?: string;
	to: string;
	subject: string;
	text?: string;
}

// welcome email template
export const welcomeEmail = async (options: IEmailOptions): Promise<void> => {
	const { to, subject } = options;

	const text = 'Welcome to our platform!';
	const data = {
		from: `Excited User <${process.env.MAILGUN_EMAIL}>`,
		to,
		subject,
		text,
	};

	await client.messages.create(mailgunDomain, data);
};

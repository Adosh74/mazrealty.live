import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import { LOGGER } from '../logging';

if (!process.env.GEMINI_API_KEY) {
	LOGGER.error('No Gemini API key found');
	process.exit(1);
}
const getAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileToGenerativePart = (path: string, mimeType: string) => {
	return {
		inlineData: {
			data: Buffer.from(fs.readFileSync(path)).toString('base64'),
			mimeType,
		},
	};
};

interface IInputData {
	name: string;
	price: number;
	address: string;
	bedrooms: number;
	bathrooms: number;
	transaction: string;
	type: string;
	area: number;
	level: number;
	furnished: boolean;
	images: string[];
}
const generateDescription = async (data: IInputData) => {
	try {
		const model = getAI.getGenerativeModel({ model: 'gemini-pro-vision' });

		const prompt = `write a proposal using HTML tags for a real estate property. The property is a ${
			data.type
		} located at ${data.address} in egypt. It has ${data.bedrooms} bedrooms, ${
			data.bathrooms
		} bathrooms, and ${data.area} square feet. The property is on level ${
			data.level
		}. The property is ${
			data.furnished ? 'furnished' : 'unfurnished'
		}. The property is for ${data.transaction}. The property is priced at $${
			data.price
		}.`;

		const imagePath = `${process.cwd()}/public/img/properties`;
		const imageParts = data.images.map((image) =>
			fileToGenerativePart(`${imagePath}/${image}`, 'image/jpeg')
		);

		const result = await model.generateContent([prompt, ...imageParts]);
		const response = await result.response;
		const description = response.text();

		return description;
	} catch (error) {
		LOGGER.error('Error in generating description', error);
		return undefined;
	}
};

export default generateDescription;

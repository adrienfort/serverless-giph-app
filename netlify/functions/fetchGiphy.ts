import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const handler: Handler = async (event) => {
	const { input } = event.queryStringParameters! || 'Homer';

	const gifList = await fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${input}&limit=9&offset=0&rating=g&lang=en`,
	).then((res) => res.json());
	return { statusCode: 200, body: JSON.stringify(gifList) };
};

// eslint-disable-next-line import/prefer-default-export
export { handler };

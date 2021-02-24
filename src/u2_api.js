import { YOUTUBE_API_KEY } from "./KEY";

const testurl = 'src/public/test.json';
const test50url = 'src/public/search50.json';
const testContent50rul = 'src/public/searchContent50.json';

export const fetchVideoList = async ({ nextPageToken, queryString }) => {
	const param = `part=snippet&maxResults=50&type=video&q=${queryString}&videoDuration=short${'&pageToken=' + nextPageToken}`;
	const url = `https://youtube.googleapis.com/youtube/v3/search?${param}&key=${YOUTUBE_API_KEY}`;
	// https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
	if (!queryString) {
		return Promise.reject({ error: 'queryString empty' });
	}

	try {
		const result = await (await fetch(url)).json();
		console.log(result);
		// const data = JSON.stringify(result)
		// console.log(data);
		if (result && result.error) {
			throw result.error;
		}
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const fetchVideosDuration = async (keys = []) => {
	const ids = keys.join(',');
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=contentDetails&key=${YOUTUBE_API_KEY}`;
	try {
		const result = await (await fetch(url)).json();
		console.log(result);
		if (result && result.error) {
			throw result.error;
		}
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
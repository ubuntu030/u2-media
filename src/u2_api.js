import { YOUTUBE_API_KEY } from "./KEY";

export const fetchVideoList = async () => {
	const param = 'part=snippet&maxResults=5&type=video&q=surfing&videoDuration=short';
	const url = `https://youtube.googleapis.com/youtube/v3/search?${param}&key=${YOUTUBE_API_KEY}`;
	// https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
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

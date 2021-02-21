//nextPageToken https://stackoverflow.com/questions/14173428/how-to-change-page-results-with-youtube-data-api-v3

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "./components/Pagination";
import VideoList from "./components/VideoList";

import { fetchVideoListCreator, getPageVideos } from "./store";

const App = () => {
	const dispatch = useDispatch();
	const pageVideos = useSelector(getPageVideos);

	useEffect(() => {
		dispatch(fetchVideoListCreator());
	}, []);

	return (
		<main>
			<section className="list-section">
				<VideoList />
			</section>
			<section className="pagination-section">
				<Pagination />
			</section>
		</main>
	)
}

export default App;
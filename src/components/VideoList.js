import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPageVideos, addFavorite } from "../store";

import "./videoList.scss";

const VideoList = () => {
	const dispatch = useDispatch();
	const videoList = useSelector(getPageVideos);

	const handleAddFavorite = (item) => {
		// console.log(item);
		dispatch(addFavorite(item));
	}
	return (
		<div className="video-list-container">
			<ul>
				{
					videoList.map(info => <Card key={info.id} info={info} favoriteCb={handleAddFavorite} />)
				}
			</ul>
		</div>
	)
}

const Card = (props) => {
	const { id, title, description, thumbnails } = props.info;
	const { favoriteCb } = props;
	return (
		<li className="card">
			<div className="card-img">
				<img src={thumbnails.url} alt={title} />
				<button onClick={() => favoriteCb(props.info)}>favorite</button>
			</div>
			<div className="card-title">
				<p>{title}</p>
			</div>
			<div className="card-desc">
				<p>{description}</p>
			</div>
		</li>
	)
}

export default VideoList;
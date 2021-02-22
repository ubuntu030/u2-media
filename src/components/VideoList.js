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
			<div className="gallery">
				{
					videoList.map(info => <Card key={info.id} info={info} favoriteCb={handleAddFavorite} />)
				}
			</div>
		</div>
	)
}

const Card = (props) => {
	const { id, title, description, thumbnails } = props.info;
	const { favoriteCb } = props;
	return (
		<div className="card">
			<div className="card-img">
				<img src={thumbnails.url} alt={title} />
				<button className="like-btn" onClick={() => favoriteCb(props.info)}>favorite</button>
			</div>
			<div className="card-title">
				<h4>{title}</h4>
			</div>
			<div className="card-desc">
				<p>{description}</p>
			</div>
		</div>
	)
}

export default VideoList;
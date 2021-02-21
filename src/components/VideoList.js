import React from "react";
import { useSelector } from "react-redux";

import { getPageVideos } from "../store";

import "./videoList.scss";

const VideoList = () => {
	const videoList = useSelector(getPageVideos);
	return (
		<div className="video-list-container">
			<ul>
				{
					videoList.map(info => <Card key={info.id} info={info} />)
				}
			</ul>
		</div>
	)
}

const Card = (props) => {
	const { id, title, description, thumbnails } = props.info;
	return (
		<li className="card">
			<img src={thumbnails.url} alt={title} className="card-img" />
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
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPageVideos, addFavorite, toggleFavorite, updatePageVideosCreator, setPlayerDisplay, updateVideoInfo, getCurrentPage } from "../store";

import IframWindow from "./IframWindow";
import "./videoList.scss";

const VideoList = () => {
	const dispatch = useDispatch();
	const videoList = useSelector(getPageVideos);
	const currentPage = useSelector(getCurrentPage);
	const [isShowIfram, setIsShowIfram] = useState(false);
	const [videoId, setVideoId] = useState('');
	const handleAddFavorite = (item) => {
		// console.log(item);
		dispatch(toggleFavorite(item));
		dispatch(updatePageVideosCreator(currentPage));
	}
	const openIfram = id => {
		setVideoId(id);
		setIsShowIfram(true);
	}

	const openPlayer = (info) => {
		dispatch(updateVideoInfo(info))
		dispatch(setPlayerDisplay(true));
	}

	return (
		<>
			<div className="video-list-container">
				<div className="gallery">
					{
						videoList.map(info => <Card key={info.id} info={info} favoriteCb={handleAddFavorite} openIframCb={openIfram} openPlayerCb={openPlayer} />)
					}
				</div>
			</div>
			<IframWindow display={isShowIfram} id={videoId} closeCb={() => setIsShowIfram(false)} />
		</>
	)
}

const Card = (props) => {
	const { id, title, description, thumbnails, like } = props.info;
	const { favoriteCb, openIframCb, openPlayerCb } = props;
	return (
		<div className="card">
			<div className="card-img">
				<img src={thumbnails.url} alt={title} />
				<img className="like-btn" onClick={() => favoriteCb(props.info)} src={`src/public/${like ? 'red-love.png' : 'gray-love.png'}`} alt="" />
				{/* <button className="like-btn" onClick={() => favoriteCb(props.info)}>favorite</button> */}
			</div>
			<div className="card-title">
				<h4>{title}</h4>
			</div>
			<div className="card-desc">
				<p>{description}</p>
			</div>
			<div className="tool-bar">
				<img src="src/public/icons8-youtube.svg" alt="youtube" onClick={() => openIframCb(id)} />
				<img src="src/public/player-play.png" alt="player" onClick={() => openPlayerCb(props.info)} />
			</div>
		</div>
	)
}

export default VideoList;
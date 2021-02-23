import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IframWindow from "./IframWindow";

import { getFavoriteList, getIsFavoriteOpen } from "../store";
import { setFavoriteDisplay, delFavorite, setPlayerDisplay, updateVideoInfo } from "../store";

import "./favoriteList.scss"

const FavoriteList = () => {
	const dispatch = useDispatch();
	const [isShowIfram, setIsShowIfram] = useState(false);
	const [videoId, setVideoId] = useState('');
	const favoriteList = useSelector(getFavoriteList);
	const isOpen = useSelector(getIsFavoriteOpen);
	const handleDisplayClick = () => {
		dispatch(setFavoriteDisplay(!isOpen));
	}
	const delFavoriteCb = (id) => {
		dispatch(delFavorite(id));
	}
	const openIfram = id => {
		setVideoId(id);
		setIsShowIfram(true);
	}
	const openPlayer = info => {
		dispatch(updateVideoInfo(info))
		dispatch(setPlayerDisplay(true));
	}
	const cardProps = {
		delCallback: delFavoriteCb,
		openIframCb: openIfram,
		openPlayerCb: openPlayer
	}

	return (
		<>
			<div onClick={handleDisplayClick} className="favorite-display-icon">
				<img src={`src/public/${isOpen ? 'gray' : 'red'}-favorite-database-48.png`} alt="favorite-database" />
			</div>
			<section className={`favorite-list-container ${isOpen ? '' : 'hidden'}`}>
				<div className="favorite-list" >
					<ul>
						{
							Object.values(favoriteList).map(item => {
								return (
									<li key={item.id}>
										<Card info={item} {...cardProps} />
									</li>
								)
							})
						}
					</ul>
				</div>
			</section>
			<IframWindow display={isShowIfram} id={videoId} closeCb={() => setIsShowIfram(false)} />
		</>
	)
}

const Card = (props) => {
	const { info } = props;
	const { delCallback, openIframCb, openPlayerCb } = props;
	return (
		<div className="favorite-card">
			<div className="img-ctn">
				<img src={info.thumbnails.url} alt={info.title} />
			</div>
			<div className="info-ctn">
				<h2>{info.title}</h2>
				<div>
					<p>{info.description}</p>
				</div>
			</div>
			<div className="control-bar">
				<img src="src/public/trash-can.png" className="trash-can" onClick={() => delCallback(info.id)} alt="trash-can" />
				<img src="src/public/icons8-youtube.svg" alt="youtube" onClick={() => openIframCb(info.id)} />
				<img src="src/public/player-play.png" alt="player" onClick={() => openPlayerCb(props.info)} />
			</div>
		</div>
	)
}

export default FavoriteList;
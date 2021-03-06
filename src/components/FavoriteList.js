import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IframWindow from "./IframWindow";

import { getFavoriteList, getIsFavoriteOpen, getCurrentPage } from "../store";
import { setFavoriteDisplay, delFavorite, setPlayerDisplay, updateVideoInfo, updatePageVideosCreator } from "../store";

import "./favoriteList.scss"

const FavoriteList = () => {
	const dispatch = useDispatch();
	const [isShowIfram, setIsShowIfram] = useState(false);
	const [videoId, setVideoId] = useState('');
	const favoriteList = useSelector(getFavoriteList);
	const isOpen = useSelector(getIsFavoriteOpen);
	const currentPage = useSelector(getCurrentPage);
	const handleDisplayClick = () => {
		dispatch(setFavoriteDisplay(!isOpen));
	}
	const delFavoriteCb = (id) => {
		dispatch(delFavorite(id));
		dispatch(updatePageVideosCreator(currentPage));
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
	const favoriteArr = Object.values(favoriteList);
	return (
		<>
			<div onClick={handleDisplayClick} className="favorite-display-icon">
				<img src={`src/public/${isOpen ? 'gray' : 'red'}-favorite-database-48.png`} alt="favorite-database" />
				{
					favoriteArr.length > 0 ?
						<div className={`count ${isOpen ? "openColor" : ""}`}>
							<p>{favoriteArr.length}</p>
						</div> : null
				}
			</div>
			<section className={`favorite-list-container ${isOpen ? '' : 'hidden'}`}>
				<div className="favorite-list" >
					<ul>
						{
							Object.values(favoriteArr).map(item => {
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
				<div className="duration-time">{info.duration_formate.frmtTime}</div>
			</div>
			<div className="info-ctn">
				<h2>{info.title}</h2>
				<p className="desc">{info.description}</p>
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
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavoriteList, getIsFavoriteOpen } from "../store";
import { setFavoriteDisplay, delFavorite } from "../store";

import "./favoriteList.scss"

const FavoriteList = () => {
	const dispatch = useDispatch();
	const favoriteList = useSelector(getFavoriteList);
	const isOpen = useSelector(getIsFavoriteOpen);
	const handleDisplayClick = () => {
		dispatch(setFavoriteDisplay(!isOpen));
	}
	const delFavoriteCb = (id) => {
		dispatch(delFavorite(id));
	}

	return (
		<>
			<div onClick={handleDisplayClick} className="favorite-display-icon">
				Favorite!
			</div>
			<section className={`favorite-list-container ${isOpen ? '' : 'hidden'}`}>
				<div className="favorite-list" >
					<ul>
						{
							Object.values(favoriteList).map(item => {
								return (
									<li key={item.id}>
										<Card info={item} delCallback={delFavoriteCb} />
									</li>
								)
							})
						}
					</ul>
				</div>
			</section>
		</>
	)
}

const Card = (props) => {
	const { info } = props;
	const { delCallback } = props;
	return (
		<div className="favorite-card">
			<div className="img-ctn">
				<img src={info.thumbnails.url} alt={info.title} />
			</div>
			<div className="info-ctn">
				<div>
					<h2>{info.title}</h2>
				</div>
				<div>
					<p>{info.description}</p>
				</div>
			</div>
			<div>
				<button onClick={() => delCallback(info.id)}>remove</button>
			</div>
		</div>
	)
}

export default FavoriteList;
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavoriteList, getIsFavoriteOpen } from "../store";
import { setFavoriteDisplay, delFavoFrite } from "../store";

import "./favoriteList.scss"

const FavoriteList = () => {
	const dispatch = useDispatch();
	const favoriteList = useSelector(getFavoriteList);
	const isOpen = useSelector(getIsFavoriteOpen);
	const handleDisplayClick = () => {
		dispatch(setFavoriteDisplay(!isOpen));
	}

	return (
		<>
			<div onClick={handleDisplayClick} className="favorite-display-icon">
				Favorite!
			</div>
			<section className={`favorite-list-container ${isOpen ? '' : 'hidden'}`}>
				<div className="favorite-list" >

				</div>
			</section>
		</>
	)
}

export default FavoriteList;
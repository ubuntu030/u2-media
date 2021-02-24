import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchVideoListCreator, updateSearchText, getSearchText } from "../store";

import "./searchBar.scss"

const SearchBar = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const [isDisplay, setIsDisplay] = useState(false);
	const searchText = useSelector(getSearchText);
	const handleSearch = () => {
		dispatch(updateSearchText(text));
		dispatch(fetchVideoListCreator({ queryString: text, forceUpdate: true }));
	}
	return (
		<section className={`search-bar-container ${isDisplay ? 'drawer-hidden' : ''}`}>
			<div className="search-part">
				<input className="search-text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
				<img onClick={handleSearch} src="src/public/search.png" alt="search" />
			</div>
			<div onClick={() => setIsDisplay(!isDisplay)} className="toggle-part">
				{isDisplay ? 'hidden' : 'search!'}
			</div>
		</section>
	)
}

export default SearchBar;
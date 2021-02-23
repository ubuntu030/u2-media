import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./searchBar.scss"

const SearchBar = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const [isDisplay, setIsDisplay] = useState(false);
	return (
		<section className={`search-bar-container ${isDisplay ? 'drawer-hidden' : ''}`}>
			<div className="search-part">
				<input className="search-text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
				<img src="src/public/search.png" alt="search"/>
			</div>
			<div onClick={() => setIsDisplay(!isDisplay)} className="toggle-part">
				toggle!
			</div>
		</section>
	)
}

export default SearchBar;
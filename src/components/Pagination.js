import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentPage, getTotalPage } from "../store";
import { updateCurrentPage, updatePageVideosCreator, updatePerPageNum, createPagesCreator, fetchVideoListCreator, getSearchText } from "../store";
import "./pagination.scss";

const Pagination = () => {
	const dispatch = useDispatch();
	const [switchPageNum, setSwitchPageNum] = useState(12);
	const currentPage = useSelector(getCurrentPage);
	const totalPageNum = useSelector(getTotalPage);
	const searchText = useSelector(getSearchText);

	const handleItemClick = (pageNum) => {
		dispatch(updateCurrentPage(pageNum));
		dispatch(updatePageVideosCreator(pageNum));
		// 點選頁籤決定是否更新新的資料
		dispatch(fetchVideoListCreator({ queryString: searchText }));
	}
	const switchPagesOnView = () => {
		dispatch(updatePerPageNum(switchPageNum));
		dispatch(createPagesCreator());
		dispatch(updateCurrentPage(1));
		dispatch(updatePageVideosCreator(1));
	}


	return (
		<nav className="pagination-container">
			<div className="pages-setting">
				<input type="number" max="24" min="6" value={switchPageNum} onChange={(e) => setSwitchPageNum(e.target.value)} placeholder="頁數" />
				<button onClick={switchPagesOnView}>SET</button>
			</div>
			<ul className="list">
				{createItem(handleItemClick, totalPageNum, currentPage)}
			</ul>
		</nav>
	)
}

const createItem = (handleItemClick, totalPageNum = 0, currentPage = 1) => {
	let itemElms = [];
	for (let index = 0; index < totalPageNum; index++) {
		itemElms.push(
			<li className={`item ${currentPage - 1 === index ? "selected" : ''}`}
				key={index}
				onClick={() => handleItemClick(index + 1)}>
				<a href="#">{index + 1}</a>
			</li>
		)
	}
	return itemElms;
}

export default Pagination;
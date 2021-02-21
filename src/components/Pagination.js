import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentPage, getTotalPage } from "../store";
import { updateCurrentPage, updatePageVideosCreator } from "../store";
import "./pagination.scss";

const Pagination = () => {
	const dispatch = useDispatch();
	const currentPage = useSelector(getCurrentPage);
	const totalPageNum = useSelector(getTotalPage);

	const handleItemClick = (pageNum) => {
		dispatch(updateCurrentPage(pageNum));
		dispatch(updatePageVideosCreator(pageNum));
	}


	return (
		<nav className="pagination-container">
			<ul className="list">
				{createItem(handleItemClick, totalPageNum)}
			</ul>
		</nav>
	)
}

const createItem = (handleItemClick, totalPageNum = 0) => {
	let itemElms = [];
	for (let index = 0; index < totalPageNum; index++) {
		itemElms.push(
			<li className="item" key={index} onClick={() => handleItemClick(index + 1)}>
				<a href="#">{index + 1}</a>
			</li>
		)
	}
	return itemElms;
}

export default Pagination;
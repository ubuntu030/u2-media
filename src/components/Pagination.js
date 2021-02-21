import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentPage, getTotalPage } from "../store";
import "./pagination.scss";

const Pagination = () => {
	const currentPage = useSelector(getCurrentPage);
	const totalPageNum = useSelector(getTotalPage);
	return (
		<nav className="pagination-container">
			<ul className="list">
				{createItem(totalPageNum)}
			</ul>
		</nav>
	)
}

const createItem = (totalPageNum = 0) => {
	let itemElms = [];
	for (let index = 0; index < totalPageNum; index++) {
		itemElms.push(
			<li className="item" key={index}>
				<a href="#">{index + 1}</a>
			</li>
		)
	}
	return itemElms;
}

export default Pagination;
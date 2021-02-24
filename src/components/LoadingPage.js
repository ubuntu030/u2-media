import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getIsLoading } from "../store";

import "./loadingPage.scss"

const LoadingPage = () => {
	const isLoading = useSelector(getIsLoading);
	return (
		isLoading ?
			<div className="loading-page-container">
				<div className="loader"></div>
			</div> : null
	)
}

export default LoadingPage;
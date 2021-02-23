import React from "react";

import "./iframWindow.scss"

const IframWindow = (props) => {
	const { id, display, closeCb } = props;
	const url = `https://www.youtube.com/embed/${id}`
	return (
		display ?
			<div className="iframwindow-container">
				<div className="control-bar">
					<img onClick={closeCb} src="src/public/macos-close.png" alt="macos-close" />
				</div>
				<div className="ifram-section">
					<iframe className="u2-video" src={url} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</div>
			</div> : null
	)

}

export default IframWindow;
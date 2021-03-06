// https://stackoverflow.com/questions/56765427/question-in-the-input-type-range-and-javascript-to-design-the-video-player
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import videojs from 'video.js';

import { getIsPlayerOpen, setPlayerDisplay, getVideoInfo } from "../store";

import "video.js/dist/video-js.css";
import "./mediaplayer.scss"

let videoPlayer = null;

const VideoPlayer = (props) => {
	const { setShowAd } = props;
	const videoRef = useRef(null);
	let player = null
	useEffect(() => {
		const video = videoRef.current;
		// instantiate Video.js
		player = videojs(video, props, function onPlayerReady() {
			console.log('onPlayerReady', this)
		});
		player.on("pause", function () {
			setShowAd(true);
		});
		player.on("play", function () {
			setShowAd(false);
		});
		videoPlayer = player;
		return () => player.dispose();
	}, [])

	return (
		<div className="vjs-container">
			<div data-vjs-player>
				<video ref={videoRef} className="video-js vjs-16-9"></video>
			</div>
		</div>
	)
}

const MediaPlayer = () => {
	const [showAd, setShowAd] = useState(false);
	const dispatch = useDispatch();
	const isShow = useSelector(getIsPlayerOpen);
	const videoInfo = useSelector(getVideoInfo);
	const videoJsOptions = {
		autoplay: true,
		controls: true,
		sources: [{
			src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
		}]
	}

	const play = () => {
		if (videoPlayer && typeof videoPlayer.play === 'function') {
			videoPlayer.play();
		}
	}
	const close = () => {
		dispatch(setPlayerDisplay(false));
	}

	return (
		isShow ?
			<main className="media-player-container">
				<div className="control-bar">
					<img onClick={close} src="src/public/macos-close.png" alt="macos-close" />
				</div>
				<div className="album-pic">
					<div onClick={play} className={`video-advertise ${showAd ? '' : 'hidden'}`}>
						<div className="content">
							<img src="src/public/advitise_img.jpg" alt="advitise-img" />
							<p className="ad-title">
							</p>
						</div>
					</div>
					<VideoPlayer {...videoJsOptions} setShowAd={setShowAd} />
				</div>
				<div className="video-info">
					<h2>{videoInfo.title}</h2>
					<div>
						<p>{videoInfo.description}</p>
					</div>
				</div>
			</main> : null
	)
}

export default MediaPlayer;
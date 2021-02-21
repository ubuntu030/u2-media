import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { fetchVideoList } from "../u2_api";

const initialState = {
	loading: false,
	videoList: [],
	pageVideos: [],
	nextPageToken: '',
	currentPage: 1,
	perPageNum: 12,
	totalPage: 0
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_VIDEO_LIST_PADDING:
			return { ...state, loading: true };
		case FETCH_VIDEO_LIST_SUCCESS: {
			const { items, nextPageToken } = action.payload;
			let snippet = null;
			const videoList = items.map(item => {
				snippet = item.snippet;
				return {
					id: item.id.videoId,
					title: snippet.title,
					description: snippet.description,
					thumbnails: snippet.thumbnails.medium
				}
			});
			// console.log(videoList);
			return { ...state, loading: false, nextPageToken, videoList };
		}
		case FETCH_VIDEO_LIST_ERROR:
			return { ...state, loading: false };
		case CREATE_PAGES: {
			let num = Math.ceil(state.videoList.length / state.perPageNum);
			// console.log('total page', totalpage);
			return { ...state, totalPage: num }
		}
		case UPDATE_PAGE_VIDEOS: {
			const { currentPage, perPageNum } = state;
			const multiPage = currentPage * perPageNum;
			// 12 videos per page
			const minData = multiPage - perPageNum;
			const maxData = multiPage - 1;
			let pageVideos = state.videoList.slice(minData, maxData + 1);
			console.log('[pageVideos]', pageVideos);
			return { ...state, pageVideos: pageVideos }
		}
		default:
			return state;
	}
}

// actions
export const FETCH_VIDEO_LIST_PADDING = 'FETCH_VIDEO_LIST_PADDING';
export const FETCH_VIDEO_LIST_SUCCESS = 'FETCH_VIDEO_LIST_SUCCESS';
export const FETCH_VIDEO_LIST_ERROR = 'FETCH_VIDEO_LIST_ERROR';
export const UPDATE_PAGE_VIDEOS = 'UPDATE_PAGE_VIDEOS';
export const CREATE_PAGES = 'CREATE_PAGES';

// selectors
export const getVideoList = state => state.videoList;
export const getPageVideos = state => state.pageVideos;

// action creator
export function fetchVideoListCreator() {
	return (dispatch, getState) => {
		dispatch({
			type: FETCH_VIDEO_LIST_PADDING,
		});
		fetchVideoList().then(data => {
			dispatch({
				type: FETCH_VIDEO_LIST_SUCCESS,
				payload: data
			});
			// 建立分頁
			dispatch(createPagesCreator());
		}).catch(error => {
			console.error(error);
			dispatch({
				type: FETCH_VIDEO_LIST_ERROR,
				error: error
			});
		});
	}
}
// 建立總頁數
export function createPagesCreator() {
	return (dispatch, getState) => {
		dispatch({
			type: CREATE_PAGES,
		});
		// 更新當前頁面資料
		dispatch(updatePageVideosCreator(getState().currentPage));
	}
}
// 建立頁面影片資料
export function updatePageVideosCreator(currentPage, getState) {
	return (dispatch, getState) => {
		dispatch({
			type: UPDATE_PAGE_VIDEOS,
			payload: currentPage
		})
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)
	));
export default store;
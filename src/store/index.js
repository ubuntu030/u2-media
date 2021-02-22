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
	totalPage: 0,
	favoriteList: {},
	isFavoriteOpen: false
};
/**
 * reducer
 */
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
		case UPDATE_CURRENT_PAGE:
			console.log('current page', action.payload);
			return { ...state, currentPage: action.payload }
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
		case ADD_FAVORITE:
			const { payload } = action;
			return { ...state, favoriteList: { ...state.favoriteList, [payload.id]: payload } }
		default:
			return state;
	}
}

/**
 * actions
 */
export const FETCH_VIDEO_LIST_PADDING = 'FETCH_VIDEO_LIST_PADDING';
export const FETCH_VIDEO_LIST_SUCCESS = 'FETCH_VIDEO_LIST_SUCCESS';
export const FETCH_VIDEO_LIST_ERROR = 'FETCH_VIDEO_LIST_ERROR';
export const UPDATE_PAGE_VIDEOS = 'UPDATE_PAGE_VIDEOS';
export const CREATE_PAGES = 'CREATE_PAGES';
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DEL_FAVORITE = 'ADD_FAVORITE';

/**
 * selectors
 */
export const getVideoList = state => state.videoList;
export const getPageVideos = state => state.pageVideos;
export const getCurrentPage = state => state.currentPage;
export const getTotalPage = state => state.totalPage;
export const getFavoriteList = state => state.favoriteList;

/**
 * action creator
 */
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
// 更新當前處於的頁數
export const updateCurrentPage = pageNum => {
	return {
		type: UPDATE_CURRENT_PAGE,
		payload: pageNum
	}
}
// 新增最愛
export const addFavorite = item => {
	return {
		type: ADD_FAVORITE,
		payload: item
	}
}
export const delFavorite = item => {
	return {
		type: DEL_FAVORITE,
		payload: item
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)
	));
export default store;
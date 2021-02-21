import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { fetchVideoList } from "../u2_api";

const initialState = {
	loading: false,
	videoList: [],
	nextPageToken: '',
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_VIDEO_LIST_PADDING:
			return { ...state, loading: true };
		case FETCH_VIDEO_LIST_SUCCESS: {
			const data = action.payload;
			const nextPageToken = (data && data.nextPageToken) ? data.nextPageToken : '';
			return { ...state, loading: false, nextPageToken };
		}
		case FETCH_VIDEO_LIST_ERROR:
			return { ...state, loading: false };
		default:
			return state;
	}
}

// selectors
export const getVideoList = state => state.videoList;

// actions
export const FETCH_VIDEO_LIST_PADDING = 'FETCH_VIDEO_LIST_PADDING';
export const FETCH_VIDEO_LIST_SUCCESS = 'FETCH_VIDEO_LIST_SUCCESS';
export const FETCH_VIDEO_LIST_ERROR = 'FETCH_VIDEO_LIST_ERROR';

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
		}).catch(error => {
			dispatch({
				type: FETCH_VIDEO_LIST_ERROR,
			});
		});
	}
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)
	));
export default store;
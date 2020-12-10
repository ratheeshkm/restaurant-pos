import { SET_LOADING, SET_LOGGED_IN, SET_LOG_OUT } from '../actions/types/appActionTypes';
import appInitialState from './initialStates/appInitialStates';

const appReducer = (state = appInitialState, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: action.loading
			}
		case SET_LOGGED_IN:
			return {
				...state,
				loggedIn: action.loggedIn
			};
		case SET_LOG_OUT:
			return {
				...state,
				loggedIn: false
			};
		default:
			return state;
	}
}

export default appReducer;
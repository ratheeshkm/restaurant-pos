import { SET_LOADING, SET_LOGGED_IN, SET_LOG_OUT, RESET } from './types/appActionTypes';
import Q from 'q';
import axios from 'axios';

export const setLoading = (loading) => {
	return {
		type: SET_LOADING,
		loading
	}
}

export const setLoggedIn = (loggedIn) => {
	return {
		type: SET_LOGGED_IN,
		loggedIn
	};
}

export const setLogout = () => {
	return {
		type: SET_LOG_OUT
	};
}

export const reset = () => {
	return {
		type: RESET
	};
}




//import Category from '../../services/category';
//import { setLoading, setLoggedIn } from './appActions';
import Q from 'q';
//import { SET_CATEGORY } from '../actions/types/categoryActionTypes';
//import { setLoginToken } from 'redux/actions/clientActions';
import axios from 'axios';
import { SET_CATEGORY } from './types/categoryActionTypes';

export const setCategories = (categories) => {
	return {
		type: SET_CATEGORY,
		categories
	}
}

export const getCategories = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		//dispatch(setLoading(true));
		axios.get("http://localhost:5000/pos/v1/categories")
			.then((result) => {
				defer.resolve(result.data.results);
				dispatch(setCategories(result.data.results));
				//dispatch(setLoading(false));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				//dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const addCategory = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		//dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/add-category", data)
			.then((result) => {
				defer.resolve(result.data);
				//dispatch(setCategories(result.data.results));
				//dispatch(setLoading(false));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				//dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const deleteCategories = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/delete-category", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getCategories());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}

export const updateCategories = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/update-category", data)
			.then(result => {
				defer.resolve(result.data);
				//dispatch(getCategories());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}
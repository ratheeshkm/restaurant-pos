import Q from 'q';
import axios from 'axios';
import { SET_SUB_CATEGORY } from './types/subCategoryActionTypes';

export const setSubCategories = (subCategories) => {
	return {
		type: SET_SUB_CATEGORY,
		subCategories
	}
}

export const getSubCategories = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		//dispatch(setLoading(true));
		axios.get("http://localhost:5000/pos/v1/getSubCategories")
			.then((result) => {
				defer.resolve(result.data.results);
				dispatch(setSubCategories(result.data.results));
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

export const addSubCategory = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		//dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/addSubCategory", data)
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

export const deleteSubCategories = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/deleteSubCategories", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getSubCategories());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}

export const updateSubCategories = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/updateSubcategories", data)
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
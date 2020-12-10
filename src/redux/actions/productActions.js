import Q from 'q';
import axios from 'axios';
import { SET_PRODUCTS } from './types/productActionTypes';
import { setLoading } from './appActions';

export const setProducts = (products) => {
	return {
		type: SET_PRODUCTS,
		products
	}
}

export const addProduct = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/add-product", data)
			.then((result) => {
				defer.resolve(result.data);
				dispatch(setLoading(false));
				dispatch(getProducts());
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const getProducts = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.get("http://localhost:5000/pos/v1/get-products")
			.then(result => {
				defer.resolve(result.data.results);
				dispatch(setProducts(result.data.results));
			})
			.catch(error => {
				defer.resolve(error);
			})
		return defer.promise
	}
}

export const deleteProduct = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/delete-product", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getProducts());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}

export const updateProduct = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/update-product", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getProducts());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}


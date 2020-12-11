import Q from 'q';
import axios from 'axios';
import { SET_INVENTORY } from './types/inventoryActionTypes';
import { setLoading } from './appActions';

export const setInventory = (inventory) => {
	return {
		type: SET_INVENTORY,
		inventory
	}
}

export const addInventory = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/add-inventory", data)
			.then((result) => {
				defer.resolve(result.data);
				dispatch(setLoading(false));
				dispatch(getInventory());
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const getInventory = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.get("http://localhost:5000/pos/v1/get-inventory")
			.then(result => {
				defer.resolve(result.data.results);
				dispatch(setInventory(result.data.results));
			})
			.catch(error => {
				defer.resolve(error);
			})
		return defer.promise
	}
}

export const deleteInventory = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/delete-inventory", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getInventory());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}

export const updateInventory = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/update-inventory", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getInventory());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}


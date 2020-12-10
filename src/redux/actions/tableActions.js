import Q from 'q';
import axios from 'axios';
import { SET_TABLES, SET_TABLE_RESET } from './types/tableActionTypes';
import { setActiveTab, setCurrentTable } from '../actions/orderActions';
import { setLoading } from '../actions/appActions';

export const setTables = (tables) => {
	return {
		type: SET_TABLES,
		tables
	}
}

export const setTableReset = () => {
	return {
		type: SET_TABLE_RESET
	}
}

export const getTables = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.get("http://localhost:5000/pos/v1/get-tables")
			.then((result) => {
				defer.resolve(result.data.results);
				dispatch(setTables(result.data.results));
				dispatch(setLoading(false));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const addTable = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		//dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/add-table", data)
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

export const deleteTables = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/delete-tables", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(getTables());
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}

export const updateTables = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/update-tables", data)
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

export const setTableStats = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.post("http://localhost:5000/pos/v1/update-table", data)
			.then(result => {
				defer.resolve(result.data);
				dispatch(setActiveTab('current'));
				dispatch(setCurrentTable(data.id));
			})
			.catch(error => {
				console.log("Error", error);
				defer.resolve(error);
			})
		return defer.promise;
	}
}


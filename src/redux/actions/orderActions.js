import Q from 'q';
import axios from 'axios';
import { 
	SET_ACTIVE_TAB, SET_INVENTORY, SET_CURRENT_TABLE, SET_ORDER_ITEM, SET_PAYMENT_TYPE, 
	SET_PAYMENT_ID, SET_ORDER_ID, SET_ORDER_LISTS, CLEAR_ORDER_ITEM, SET_ORDER_CATEGORY, 
	SET_ORDER_RESET, UPDATE_ORDER_ITEM, SET_ORDER_ITEMS, SET_COMPLETED_ORDERS
} from './types/orderActionTypes';
import { setLoading } from '../actions/appActions';
import { getTables } from '../actions/tableActions';

export const setOrderReset = () => {
	return {
		type: SET_ORDER_RESET
	}
}

export const setActiveTab = (status) => {
	return {
		type: SET_ACTIVE_TAB,
		status
	}
}

export const setInventory = (inventory) => {
	return {
		type: SET_INVENTORY,
		inventory
	}
}

export const setCurrentTable = (tableId) => {
	return {
		type: SET_CURRENT_TABLE,
		tableId
	}
}

export const setOrderItem = (item) => {
	return {
		type: SET_ORDER_ITEM,
		item
	}
}

export const setOrderItems = (items) => {
	return {
		type: SET_ORDER_ITEMS,
		items
	}
}

export const setCompletedOrders = (orders) => {
	return {
		type: SET_COMPLETED_ORDERS,
		orders
	}
}

export const updateOrderItem = (item) => {
	return {
		type: UPDATE_ORDER_ITEM,
		item
	}
}

export const saveOrderItem = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		data[0].orderid = getState().order.orderId;
		data[0].tableid = getState().order.currentTable;
		axios.post("http://localhost:5000/pos/v1/save-order-item", data)
			.then((result) => {
				defer.resolve(result);
				data[0].id = result.data.rows[0].id;
				dispatch(getOrderLists());
				dispatch(getOrderItems(getState().order.orderId));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const updateOrderItemDb = (data, itemId) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		console.log("Data", data);
		
		axios.post("http://localhost:5000/pos/v1/update-order-item", {
			data: data,
			itemId: itemId
		})
		.then((result) => {
			defer.resolve(result);
			dispatch(updateOrderItem(data));
			dispatch(getOrderLists());
		})
		.catch((error) => {
			console.log("Error", error);
			defer.resolve(error);
			dispatch(setLoading(false));
		});
		
		return defer.promise;
	}
}

export const deleteOrderItem = (itemId, ) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/delete-order-item", {
			itemId: itemId
		})
		.then((result) => {
			defer.resolve(result);
			//dispatch(getOrderLists());
			dispatch(getOrderItems(getState().order.orderId));
		})
		.catch((error) => {
			console.log("Error", error);
			defer.resolve(error);
			dispatch(setLoading(false));
		});
		return defer.promise;
	}
}

export const clearOrderItem = (item) => {
	return {
		type: CLEAR_ORDER_ITEM,
		item
	}
}

export const setPaymentType = (paymentType) => {
	return {
		type: SET_PAYMENT_TYPE,
		paymentType
	}
}

export const setOrderId = (orderId) => {
	return {
		type: SET_ORDER_ID,
		orderId
	}
}

export const setPaymentId = (paymentId) => {
	return {
		type: SET_PAYMENT_ID,
		paymentId
	}
}

export const getInventory = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		axios.get("http://localhost:5000/pos/v1/get-inventory")
			.then(result => {
				defer.resolve(result.data.results);
				console.log(result.data.results);
				dispatch(setInventory(result.data.results));
			})
			.catch(error => {
				defer.resolve(error);
			})
		return defer.promise
	}
}

export const setOrderCategory = (orderCategory) => {
	return {
		type: SET_ORDER_CATEGORY,
		orderCategory
	}
}

export const setOrderLists = (orderLists) => {
	return {
		type: SET_ORDER_LISTS,
		orderLists
	}
}

export const createOrder = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/create-order", data)
			.then((result) => {
				defer.resolve(result);
				console.log("createOrder--->", result.data)
				const { orderId, paymentId } = result.data;
				dispatch(setOrderId(orderId));
				//dispatch(setPaymentId(paymentId));
				dispatch(setActiveTab('current'));
				dispatch(getTables());
				dispatch(getOrderLists());
				dispatch(clearOrderItem());

			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const getOrderLists = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.get("http://localhost:5000/pos/v1/get-order-lists")
			.then((result) => {
				defer.resolve(result);
				console.log("Order lists, ", result.data.results)
				dispatch(setOrderLists(result.data.results));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const getOrderItems = (orderid) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/get-order-items", { orderid : orderid})
			.then((result) => {
				defer.resolve(result);
				console.log("result.data.result-->", result.data.results);
				if(result.data.results.length) {
					dispatch(setOrderItems(result.data.results));
				} else {
					dispatch(setOrderItems([]));
				}
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const setPayment = (data) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/set-paymet", data)
			.then((result) => {
				defer.resolve(result);
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const setDelivery = (data) => {
	return(dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/set-delivery", data)
		.then((result) => {
			defer.resolve(result);
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

export const initiatePayment = (orderid) => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.post("http://localhost:5000/pos/v1/initiate-payment", {
			orderId: orderid
		})
			.then((result) => {
				const { paymentId } = result.data;
				defer.resolve(paymentId);
				dispatch(setPaymentId(paymentId));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}

export const getCompletedOrders = () => {
	return (dispatch, getState) => {
		let defer = Q.defer();
		dispatch(setLoading(true));
		axios.get("http://localhost:5000/pos/v1/get-completed-orders")
			.then((result) => {
				defer.resolve(result);
				dispatch(setCompletedOrders(result.data.results));
			})
			.catch((error) => {
				console.log("Error", error);
				defer.resolve(error);
				dispatch(setLoading(false));
			})
		return defer.promise;
	}
}


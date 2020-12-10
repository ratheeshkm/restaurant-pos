import { SET_ACTIVE_TAB, SET_INVENTORY, SET_CURRENT_TABLE, SET_ORDER_ITEM, 
	SET_PAYMENT_TYPE, SET_ORDER_ID, SET_PAYMENT_ID, SET_ORDER_LISTS, CLEAR_ORDER_ITEM, 
	SET_ORDER_CATEGORY, SET_ORDER_RESET, UPDATE_ORDER_ITEM, SET_ORDER_ITEMS } from '../actions/types/orderActionTypes';
import orderIntialStates from './initialStates/orderIntialStates';

const orderReducer = (state = orderIntialStates, action) => {
	switch (action.type) {
		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.status
			}
		case SET_INVENTORY:
			return {
				...state,
				inventory: action.inventory
			}
		case SET_CURRENT_TABLE:
			return {
				...state,
				currentTable: action.tableId
			}
		case SET_ORDER_ITEM:
			let items = state.items;
			return {
				...state,
				items: [ ...items, ...action.item ]
			}
		case SET_ORDER_ITEMS:
			return {
				...state,
				items: [ ...action.items ]
			}
		case UPDATE_ORDER_ITEM:
			let updateItems = state.items;
			return {
				...state,
				items: updateItems.map(item => (item.id === action.item.id) ? action.item : item)
			}
		case CLEAR_ORDER_ITEM:
			return {
				...state,
				items: []
			}
		case SET_PAYMENT_TYPE:
			return {
				...state,
				paymentType: action.paymentType
			}
		case SET_ORDER_ID:
			return {
				...state,
				orderId: action.orderId
			}
		case SET_PAYMENT_ID:
			return {
				...state,
				paymentId: action.paymentId
			}
		case SET_ORDER_LISTS: 
			return {
				...state,
				orderLists: action.orderLists
			}
		case SET_ORDER_CATEGORY: 
			return {
				...state,
				orderCategory: action.orderCategory
			}
		case SET_ORDER_RESET: 
			return orderIntialStates
		default:
			return state;
	}
}

export default orderReducer;
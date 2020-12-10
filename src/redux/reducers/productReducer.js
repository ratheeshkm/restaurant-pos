import { SET_PRODUCTS } from '../actions/types/productActionTypes';
import productInitialState from './initialStates/productInitialState';

const productReducer = (state = productInitialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return {
				...state,
				products: action.products
			}
		default:
			return state;
	}
}

export default productReducer;
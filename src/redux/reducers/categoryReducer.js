import { SET_CATEGORY } from '../actions/types/categoryActionTypes';
import categoryInitalState from './initialStates/categoryInitialStates';

const categoryReducer = (state = categoryInitalState, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return {
				...state,
				categories: action.categories
			}
		default:
			return state;
	}
}

export default categoryReducer;
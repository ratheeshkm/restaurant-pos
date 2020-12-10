import { SET_INVENTORY } from '../actions/types/inventoryActionTypes';
import inventoryInitalState from './initialStates/inventoryInitialStates';

const inventoryReducer = (state = inventoryInitalState, action) => {
	switch (action.type) {
		case SET_INVENTORY:
			return {
				...state,
				inventory: action.inventory
			}
		default:
			return state;
	}
}

export default inventoryReducer;
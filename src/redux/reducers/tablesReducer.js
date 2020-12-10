import { SET_TABLES, SET_TABLE_RESET } from '../actions/types/tableActionTypes';
import tablesInitialState from './initialStates/tablesInitialState';

const tableReducer = (state = tablesInitialState, action) => {
	switch (action.type) {
		case SET_TABLES:
			return {
				...state,
				tables: action.tables
			}
		case SET_TABLE_RESET:
			return tablesInitialState
		default:
			return state;
	}
}

export default tableReducer;
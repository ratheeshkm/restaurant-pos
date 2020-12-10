import { combineReducers } from "redux";
import app from "./appReducer";
import client from "./clientReducer";
import ThemeOptions from '../../reducers/ThemeOptions';
import categories from './categoryReducer';
import subCategories from './subCategoryReducer';
import inventory  from './inventoryReducer';
import products  from './productReducer';
import tables from './tablesReducer';
import order from './orderReducer'

const combinedReducer = combineReducers({
	ThemeOptions,
	app,
	client,
	categories,
	subCategories,
	inventory,
	tables,
	order,
	products
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET') {
		state = undefined;
	}
	return combinedReducer(state, action);
}

export default rootReducer;
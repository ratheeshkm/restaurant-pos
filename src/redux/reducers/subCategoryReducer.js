import { SET_SUB_CATEGORY } from '../actions/types/subCategoryActionTypes';

const subCategoryReducer = (state = { subCategories: [] }, action) => {
	switch (action.type) {
		case SET_SUB_CATEGORY:
			return {
				...state,
				subCategories: action.subCategories
			}

		default:
			return state;
	}
}

export default subCategoryReducer;
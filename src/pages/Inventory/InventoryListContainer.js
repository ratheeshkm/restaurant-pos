import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import InventoryList from './InventoryList';
import { getInventory, deleteInventory, updateInventory } from '../../redux/actions/inventoryActions';
import { getSubCategories } from '../../redux/actions/subCategoryActions';
import { getCategories } from '../../redux/actions/categoryActions';
const mapStateToProps = (state, ownProps) => {
	const { inventory } = state.inventory;
	const { categories } = state.categories;
	const { subCategories } = state.subCategories;
	return {
		inventory,
		categories,
		subCategories
	}
}

const actionContainer = {
	getInventory,
	getSubCategories,
	getCategories,
	deleteInventory,
	updateInventory
}

export default withRouter(connect(mapStateToProps, actionContainer)(InventoryList));


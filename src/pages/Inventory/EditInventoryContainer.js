import { connect } from 'react-redux';
import EditInventory from './EditInventory';
import { withRouter } from "react-router";
import { addInventory, getInventory, updateInventory } from '../../redux/actions/inventoryActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getSubCategories } from '../../redux/actions/subCategoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { categories } = state.categories;
	const { subCategories } = state.subCategories;
	const { inventory } = state.inventory;
	return {
		loading,
		categories,
		subCategories,
		inventory
	};
}

const actionCreaters = {
	addInventory,
	getCategories,
	getSubCategories,
	getInventory,
	updateInventory
}

export default withRouter(connect(mapStateToProps, actionCreaters)(EditInventory));
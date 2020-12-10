import { connect } from 'react-redux';
import AddInventory from './AddInventory';
import { withRouter } from "react-router";
import { addInventory } from '../../redux/actions/inventoryActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getSubCategories } from '../../redux/actions/subCategoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { categories } = state.categories;
	const { subCategories } = state.subCategories;
	return {
		loading,
		categories,
		subCategories
	};
}

const actionCreaters = {
	addInventory,
	getCategories,
	getSubCategories
}

export default withRouter(connect(mapStateToProps, actionCreaters)(AddInventory));
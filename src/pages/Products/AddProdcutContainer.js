import { connect } from 'react-redux';
import AddProduct from './AddProduct';
import { withRouter } from "react-router";
import { addProduct } from '../../redux/actions/productActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getSubCategories } from '../../redux/actions/subCategoryActions';
import { getInventory } from '../../redux/actions/inventoryActions';

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
	addProduct,
	getCategories,
	getSubCategories,
	getInventory
}

export default withRouter(connect(mapStateToProps, actionCreaters)(AddProduct));
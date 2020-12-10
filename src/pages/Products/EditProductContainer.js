import { connect } from 'react-redux';
import EditProduct from './EditProduct';
import { withRouter } from "react-router";
import { addProduct, getProducts, updateProduct } from '../../redux/actions/productActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getSubCategories } from '../../redux/actions/subCategoryActions';
import { getInventory } from '../../redux/actions/inventoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { categories } = state.categories;
	const { subCategories } = state.subCategories;
	const { products } = state.products;
	const { inventory } = state.inventory;
	return {
		loading,
		categories,
		subCategories,
		products,
		inventory
	};
}

const actionCreaters = {
	addProduct,
	getCategories,
	getSubCategories,
	getProducts,
	updateProduct,
	getInventory
}

export default withRouter(connect(mapStateToProps, actionCreaters)(EditProduct));
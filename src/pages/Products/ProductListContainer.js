import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ProductList from './ProductList';
import { getProducts, deleteProduct, updateProduct } from '../../redux/actions/productActions';
import { getSubCategories } from '../../redux/actions/subCategoryActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getInventory } from '../../redux/actions/inventoryActions';

const mapStateToProps = (state, ownProps) => {
	const { products } = state.products;
	const { categories } = state.categories;
	const { subCategories } = state.subCategories;
	const { inventory } = state.inventory;
	return {
		products,
		categories,
		subCategories,
		inventory
	}
}

const actionContainer = {
	getProducts,
	getSubCategories,
	getCategories,
	getInventory,
	deleteProduct,
	updateProduct
}

export default withRouter(connect(mapStateToProps, actionContainer)(ProductList));


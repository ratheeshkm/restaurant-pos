import { connect } from 'react-redux';
import CurrentTab from './CurrentTab';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getCategories } from '../../redux/actions/categoryActions';
import { getInventory, setOrderItem, setPaymentType, setPayment, saveOrderItem, 
setOrderReset, setDelivery, initiatePayment } from '../../redux/actions/orderActions';
import { setTableReset } from '../../redux/actions/tableActions';
import { getProducts } from "../../redux/actions/productActions";

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { categories } = state.categories;
	const { products } = state.products;
	const { inventory, paymentType, paymentId, currentTable, items, orderId, orderCategory } = state.order;
	return {
		loading,
		ownProps,
		categories,
		inventory,
		paymentType,
		paymentId,
		currentTable,
		items,
		orderId,
		orderCategory,
		products
	};
}

const actionCreaters = {
	setLoading,
	getCategories,
	getInventory,
	setOrderItem,
	setPaymentType,
	setPayment,
	saveOrderItem,
	setOrderReset,
	setTableReset,
	setDelivery,
	initiatePayment,
	getProducts
}

export default withRouter(connect(mapStateToProps, actionCreaters)(CurrentTab));
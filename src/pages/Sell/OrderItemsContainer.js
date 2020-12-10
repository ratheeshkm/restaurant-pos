import { connect } from 'react-redux';
import OrderItems from './OrderItems';
import { withRouter } from "react-router";
import { setActiveTab, createOrder, setOrderCategory, updateOrderItemDb, deleteOrderItem } from '../../redux/actions/orderActions';
import { getTables } from '../../redux/actions/tableActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { currency } = state.client;
	const { inventory, currentTable, items, orderId, orderCategory } = state.order;
	const { tables } = state.tables;
	return {
		loading,
		ownProps,
		inventory, 
		currentTable, 
		items,
		tables,
		orderId,
		orderCategory,
		currency
	};
}

const actionCreaters = {
	setActiveTab,
	createOrder,
	getTables,
	setOrderCategory,
	updateOrderItemDb,
	deleteOrderItem
}

export default withRouter(connect(mapStateToProps, actionCreaters)(OrderItems));
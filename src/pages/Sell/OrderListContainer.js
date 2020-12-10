import { connect } from 'react-redux';
import OrderLists from './OrderLists';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getOrderLists, setOrderId, setActiveTab, clearOrderItem, setCurrentTable, 
	setOrderCategory, getOrderItems, setOrderReset, setPaymentId } from '../../redux/actions/orderActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { orderLists, orderId } = state.order;
	return {
		loading,
		orderLists,
		orderId
	};
}

const actionCreaters = {
	setLoading,
	getOrderLists,
	setOrderId,
	setActiveTab,
	clearOrderItem,
	setCurrentTable,
	setOrderCategory,
	getOrderItems,
	setOrderReset,
	setPaymentId
}

export default withRouter(connect(mapStateToProps, actionCreaters)(OrderLists));
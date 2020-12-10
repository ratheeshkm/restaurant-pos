import { connect } from 'react-redux';
import TakeAway from './TakeAway';
import { withRouter } from "react-router";
import { createOrder, setOrderCategory, setOrderReset, setOrderId, clearOrderItem, getOrderLists, 
	setActiveTab, setCurrentTable, getOrderItems, setPaymentId } from '../../redux/actions/orderActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { orderLists } = state.order;
	return {
		loading,
		orderLists
	};
}

const actionCreaters = {
	createOrder,
	setOrderCategory,
	setOrderReset,
	setOrderId,
	clearOrderItem,
	getOrderLists, 
	setActiveTab, 
	setCurrentTable, 
	getOrderItems, 
	setPaymentId
}

export default withRouter(connect(mapStateToProps, actionCreaters)(TakeAway));
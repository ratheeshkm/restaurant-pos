import { connect } from 'react-redux';
import TableLists from './TableLists';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getRestaurantDetails } from '../../redux/actions/clientActions';
import { getTables, deleteTables, updateTables } from '../../redux/actions/tableActions';
import { createOrder, setCurrentTable, setOrderCategory, setPayment } from '../../redux/actions/orderActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { restaurantDetails } = state.app;
	const { tables } = state.tables;
	return {
		loading,
		restaurantDetails,
		tables,
		ownProps
	};
}

const actionCreaters = {
	setLoading,
	getRestaurantDetails,
	getTables,
	deleteTables,
	updateTables,
	createOrder,
	setCurrentTable,
	setOrderCategory,
	setPayment
}

export default withRouter(connect(mapStateToProps, actionCreaters)(TableLists));
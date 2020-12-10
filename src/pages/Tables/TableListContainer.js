import { connect } from 'react-redux';
import TableLists from './TableLists.js';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getRestaurantDetails } from '../../redux/actions/clientActions';
import { getTables, deleteTables, updateTables } from '../../redux/actions/tableActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { restaurantDetails } = state.client;
	const { tables } = state.tables;
	return {
		loading,
		restaurantDetails,
		tables
	};
}

const actionCreaters = {
	setLoading,
	getRestaurantDetails,
	getTables,
	deleteTables,
	updateTables
}

export default withRouter(connect(mapStateToProps, actionCreaters)(TableLists));
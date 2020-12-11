import { connect } from 'react-redux';
import Dashborad from './Dashboard';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getCompletedOrders } from '../../redux/actions/orderActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { completedOrders } = state.order;
	return {
		loading,
		completedOrders
	};
}

const actionCreaters = {
	setLoading,
	getCompletedOrders
}

export default withRouter(connect(mapStateToProps, actionCreaters)(Dashborad));
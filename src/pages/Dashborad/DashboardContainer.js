import { connect } from 'react-redux';
import Dashborad from './Dashboard';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getCompletedOrders } from '../../redux/actions/orderActions';

const mapStateToProps = (state, ownProps) => {
	const { completedOrders } = state.order;
	return {
		completedOrders
	};
}

const actionCreaters = {
	getCompletedOrders
}

export default connect(mapStateToProps, actionCreaters)(Dashborad);
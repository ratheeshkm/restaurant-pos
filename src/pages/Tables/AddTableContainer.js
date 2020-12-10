import { connect } from 'react-redux';
import AddTable from './AddTable';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getRestaurantDetails } from '../../redux/actions/clientActions';
import { addTable } from '../../redux/actions/tableActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { restaurantDetails } = state.app;
	return {
		loading,
		restaurantDetails
	};
}

const actionCreaters = {
	setLoading,
	getRestaurantDetails,
	addTable
}

export default withRouter(connect(mapStateToProps, actionCreaters)(AddTable));
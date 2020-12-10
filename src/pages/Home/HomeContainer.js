import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Home from './Home';
import { addRestaurantDetails } from '../../redux/actions/clientActions';

const mapStateToProps = (state, ownProps) => {
	const isRestaurantAdded = (state.client.restaurantName) ? true : false;
	return {
		isRestaurantAdded
	};
}

const actionCreaters = {
	addRestaurantDetails,
}

export default withRouter(connect(mapStateToProps, actionCreaters)(Home))
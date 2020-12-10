import { connect } from 'react-redux';
import Login from './Login';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { setLogin, getRestaurantDetails } from '../../redux/actions/clientActions';

const mapStateToPros = (state, ownProps) => {
	const  { loading, loggedIn } = state.app;
  return {
	 loading,
	 loggedIn
  }
}

const actionCreators = {
	setLoading,
	setLogin,
	getRestaurantDetails
}

export default withRouter(connect(mapStateToPros, actionCreators)(Login));
import { connect } from 'react-redux';
import AddCategory from './AddCategory';
import { withRouter } from "react-router";
import { addCategory } from '../../redux/actions/categoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	return {
		loading
	};
}

const actionCreaters = {
	addCategory
}

export default withRouter(connect(mapStateToProps, actionCreaters)(AddCategory));
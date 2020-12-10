import { connect } from 'react-redux';
import CategoryList from './CategoryList';
import { withRouter } from "react-router";
import { setLoading } from '../../redux/actions/appActions';
import { getCategories, deleteCategories, updateCategories } from '../../redux/actions/categoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { categories } = state.categories;
	return {
		loading,
		categories
	};
}

const actionCreaters = {
	setLoading,
	getCategories,
	deleteCategories,
	updateCategories
}

export default withRouter(connect(mapStateToProps, actionCreaters)(CategoryList));
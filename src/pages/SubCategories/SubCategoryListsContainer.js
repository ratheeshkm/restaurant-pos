import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import SubCategoryList from '../SubCategories/SubCategoryList';
import { setLoading } from '../../redux/actions/appActions';
//import { withRouter } from "react-router";
import { getSubCategories, deleteSubCategories, updateSubCategories } from '../../redux/actions/subCategoryActions';
import {  getCategories } from '../../redux/actions/categoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { subCategories } = state.subCategories;
	const { categories } = state.categories;

	return {
		loading,
		subCategories,
		categories
	}
}

const actionCreaters = {
	setLoading,
	getSubCategories,
	deleteSubCategories,
	updateSubCategories,
	getCategories
}


export default withRouter(connect(mapStateToProps, actionCreaters)(SubCategoryList));
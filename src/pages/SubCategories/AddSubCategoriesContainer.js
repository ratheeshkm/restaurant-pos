import { connect } from 'react-redux';
import AddSubCategory from './AddSubCategory';
import { addSubCategory } from '../../redux/actions/subCategoryActions';
import { getCategories } from '../../redux/actions/categoryActions';

const mapStateToProps = (state, ownProps) => {
	const { loading } = state.app;
	const { categories } = state.categories;
	return {
		loading,
		categories
	};
}

const actionCreaters = {
	addSubCategory,
	getCategories
}

export default connect(mapStateToProps, actionCreaters)(AddSubCategory);
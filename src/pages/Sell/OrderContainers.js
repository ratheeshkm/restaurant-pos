import { connect } from 'react-redux';
import Orders from './Orders';
import { withRouter } from "react-router";
import { getTables } from '../../redux/actions/tableActions';
import { setActiveTab, clearOrderItem } from '../../redux/actions/orderActions';
import { getCategories } from '../../redux/actions/categoryActions';

const mapStateToProps = (state, ownProps) => {
	const { tables } = state.tables;
	const { activeTab, orderId } = state.order;
	const { categories } = state.categories;
	return {
		tables,
		activeTab,
		categories,
		orderId
	};
}

const actionCreaters = {
	getTables,
	setActiveTab,
	getCategories,
	clearOrderItem
}

export default withRouter(connect(mapStateToProps, actionCreaters)(Orders));
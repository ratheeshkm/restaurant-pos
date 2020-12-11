import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../Layout/AppMain/PageTitle';
import { Button } from 'reactstrap';
import TableList from '../../components/TableList';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { formatColumn } from '../../components/FormatColumn';

const CategoryList = (props) => {
	const { categories, getCategories, updateCategories, deleteCategories  } = props;
	
	useEffect(() => {
		getCategories();
	}, [getCategories]);
	
	if (!categories) return null;

	function nameColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'name');
		return (
			<span>{cellValue}</span>
		);
	}

	function desciptionColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'description');
		return (
			<span>{cellValue}</span>
		);
	}
	
	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true,
			searchable: false
		}, 
		{
			dataField: 'name',
			text: 'Name',
			sort: true,
			formatter: nameColumnFormatter,
		}, 
		{
			dataField: 'description',
			text: 'Description',
			sort: true,
			formatter: desciptionColumnFormatter,
		}, 
		{
			dataField: 'action',
			isDummyColumn: true,
			text: 'Action',
			sort: false,
			classes: 'table-action',
			searchable: false,
			csvExport: false,
			editable: false,
			headerStyle: (colum, colIndex) => {
				return { width: '15%', textAlign: 'center' };
			}
		}
	];

	return (
		<Fragment>
			<Row>
				<Col lg="8">
					<PageTitle
						heading="Category List"
						subheading="List of all the categories."
						icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
					/>
				</Col>
				<Col lg="4">
					<div className="app-page-title">
						<div className="page-title-wrapper">
							<div className={cx("page-title-icon")} style={{ boxShadow: "0 0 black", background: "none"}}></div>
							<div className="page-title-actions">
								<Link to="/add-category"><Button color="primary">Add Category</Button></Link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<TableList columns={columns} data={categories} update={updateCategories} delete={deleteCategories} />
		</Fragment>
	)
}

export default CategoryList;
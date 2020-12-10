import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../Layout/AppMain/PageTitle';
import { formatColumn } from '../../components/FormatColumn';
import TableList from '../../components/TableList';
import { Type } from 'react-bootstrap-table2-editor';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Button } from 'reactstrap';

const SubCategoryList = (props) => {
	const {
		subCategories,
		getSubCategories,
		categories,
		getCategories,
		deleteSubCategories,
		updateSubCategories
	} = props;

	useEffect(() => {
		getSubCategories();
		getCategories();
	}, [getSubCategories, getCategories]);

	if (!categories || !subCategories) return null;
	
	let categoriesList = categories.map(item => {
		return {
			value: item.id,
			label: item.name
		}
	})
	
	function nameColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'subCategoryName');
		return (
			<span>{cellValue}</span>
		);
	}

	function desciptionColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'subCategoryDescription');
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
			dataField: 'categoryId',
			text: 'Category',
			hidden: false,
			searchable: true,
			formatter: (cell, row, rowIndex, formatExtraData) => {
				return formatColumn(cell, row, rowIndex, formatExtraData, 'categoryId', categories);
			},
			editor: {
				type: Type.SELECT,
				getOptions: (setOptions, { row, column }) => {
					return [...categoriesList];
				}
			}
		},
		{
			dataField: 'subCategoryName',
			text: 'Sub Category Name',
			sort: true,
			formatter: nameColumnFormatter,
		},
		{
			dataField: 'subCategoryDescription',
			text: 'Sub Category Description',
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
							<div className={cx("page-title-icon")} style={{ boxShadow: "0 0 black", background: "none" }}></div>
							<div className="page-title-actions">
								<Link to="/add-sub-category"><Button color="primary">Add Sub Category</Button></Link>
							</div>
						</div>
					</div>
				</Col>
			</Row>

			<TableList columns={columns} data={subCategories} update={updateSubCategories} delete={deleteSubCategories} />
		</Fragment>
	)
}

export default SubCategoryList;
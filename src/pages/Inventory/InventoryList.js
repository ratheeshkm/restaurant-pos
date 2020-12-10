import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../Layout/AppMain/PageTitle';
import { Button } from 'reactstrap';
import TableList from '../../components/TableList';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { formatColumn } from '../../components/FormatColumn';
import { Type } from 'react-bootstrap-table2-editor';
import ActionDropdown from '../../components/ActionDropDown';

const InventoryList = (props) => {
	console.log(props)
	const { 
		inventory=[], 
		getInventory, 
		getSubCategories, 
		getCategories, 
		categories, 
		subCategories,
		deleteInventory,
		updateInventory
	} = props;

	useEffect(() => {
		getInventory();
		getSubCategories();
		getCategories();
	}, [getInventory, getSubCategories , getCategories]);
	
	if (!inventory || !categories || !subCategories) return null;

	let categoriesList = categories.map(item => {
		return {
			value: item.id,
			label: item.name
		}
	})

	let subCategoriesList = subCategories.map(item => {
		return {
			value: item.id,
			label: item.subCategoryName
		}
	})

	console.log(inventory);
	console.log(subCategories);
	console.log(subCategoriesList);
	const ActionColumn = (cell, row, rowIndex, formatExtraData) => {
		if (!row) {
			return null;
		}
		let action = '';
		let currentEditedRow = formatExtraData.editedRows.filter(item => item.rowId === row.id) || [];
		if (currentEditedRow.length) {
			[{ action = '' }] = currentEditedRow;
		}
		let actionText = (action === 'Delete') ? 'Undo Delete' : 'Delete';
		return (
			<Fragment>
				<ActionDropdown
					actions={[
						{
							callback: () => {
								formatExtraData.callback(row, actionText)
							},
							title: actionText,
							className: 'link-gray'
						},
						{
							pathname:"/edit-inventory/"+row.id,
							title: "Edit",
							className: 'link-gray'
						}
					]}
				/>
			</Fragment>
		);
	}
	
	function nameColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'name');
		return (
			<span>{cellValue}</span>
		);
	}

	function imageColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'image');
		return (
			<span><img src={'http://localhost:5000/'+cellValue} alt="pic" width="150px" /></span>
		);
	}

	function descriptionColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'description');
		return (
			<span>{cellValue}</span>
		);
	}

	function quantityColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'quantity');
		return (
			<span>{cellValue}</span>
		);
	}

	function priceColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'price');
		return (
			<span>{cellValue}</span>
		);
	}

	function statusColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'status');
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
			cellEdit: false
		},
		{
			dataField: 'image',
			text: 'Image',
			sort: true,
			formatter: imageColumnFormatter,
		},
		{
			dataField: 'description',
			text: 'Description',
			sort: true,
			formatter: descriptionColumnFormatter,
		},
		{
			dataField: 'quantity',
			text: 'Quantitiy',
			sort: true,
			formatter: quantityColumnFormatter,
		},
		{
			dataField: 'price',
			text: 'Price',
			sort: true,
			formatter: priceColumnFormatter,
		},
		{
			dataField: 'status',
			text: 'Status',
			sort: true,
			formatter: statusColumnFormatter,
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
			},
			formatter: ActionColumn
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
								<Link to="/add-inventory"><Button color="primary">Add Inventory</Button></Link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<TableList columns={columns} data={inventory} delete={deleteInventory} update={updateInventory} />
		</Fragment>
	)
}

export default InventoryList;
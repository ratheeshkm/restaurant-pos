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

const ProductList = (props) => {
	const { 
		products=[], 
		getProducts, 
		getSubCategories, 
		getCategories, 
		categories, 
		subCategories,
		deleteProduct,
		updateProduct,
		getInventory,
		inventory
	} = props;

	useEffect(() => {
		getProducts();
		getSubCategories();
		getCategories();
		getInventory();
	}, [getProducts, getSubCategories , getCategories, getInventory]);
	
	if (!inventory.length || !categories.length || !subCategories) return null;

	let inventoryList = inventory.map(item => {
		return {
			value: item.id,
			label: item.name
		}
	})

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
							pathname:"/edit-product/"+row.id,
							title: "Edit",
							className: 'link-gray'
						}
					]}
				/>
			</Fragment>
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
			dataField: 'inventoryid',
			text: 'Inventory',
			hidden: false,
			searchable: true,
			formatter: (cell, row, rowIndex, formatExtraData) => {
				return formatColumn(cell, row, rowIndex, formatExtraData, 'inventoryid', inventory);
			},
			editor: {
				type: Type.SELECT,
				getOptions: (setOptions, { row, column }) => {
					return [...inventoryList];
				}
			}
		},
		{
			dataField: 'categoryid',
			text: 'Category',
			hidden: false,
			searchable: true,
			formatter: (cell, row, rowIndex, formatExtraData) => {
				return formatColumn(cell, row, rowIndex, formatExtraData, 'categoryid', categories);
			},
			editor: {
				type: Type.SELECT,
				getOptions: (setOptions, { row, column }) => {
					return [...categoriesList];
				}
			}
		},
		{
			dataField: 'subcategoryid',
			text: 'Sub Category',
			hidden: false,
			searchable: true,
			formatter: (cell, row, rowIndex, formatExtraData) => {
				return formatColumn(cell, row, rowIndex, formatExtraData, 'subcategoryid', subCategories, 'subCategoryName');
			},
			editor: {
				type: Type.SELECT,
				getOptions: (setOptions, { row, column }) => {
					return [...subCategoriesList];
				}
			}
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
						heading="Product List"
						subheading="List of all the products"
						icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
					/>
				</Col>
				<Col lg="4">
					<div className="app-page-title">
						<div className="page-title-wrapper">
							<div className={cx("page-title-icon")} style={{ boxShadow: "0 0 black", background: "none"}}></div>
							<div className="page-title-actions">
								<Link to="/add-product"><Button color="primary">Add Product</Button></Link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<TableList columns={columns} data={products} delete={deleteProduct} update={updateProduct} />
		</Fragment>
	)
}

export default ProductList;
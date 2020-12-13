import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../Layout/AppMain/PageTitle';
import { Button } from 'reactstrap';
import TableList from '../../components/TableList';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { formatColumn } from '../../components/FormatColumn';

const TableLists = (props) => {
	const { restaurantDetails, tables, getRestaurantDetails, getTables, updateTables, deleteTables } = props;
	useEffect(() => {
		getRestaurantDetails();
		getTables();
	}, [getRestaurantDetails, getTables]);


	if (!restaurantDetails) return null;

	function nameColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'name');
		return (
			<span>{cellValue}</span>
		);
	}

	function noOfChairesColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'no-of-chaires');
		return (
			<span>{cellValue}</span>
		);
	}

	function floorColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'floor');
		return (
			<span>{cellValue}</span>
		);
	}

	function roomColumnFormatter(cell, row, rowIndex, formatExtraData) {
		let cellValue = formatColumn(cell, row, rowIndex, formatExtraData, 'floor');
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
			text: 'Table Name',
			sort: true,
			formatter: nameColumnFormatter,
		},
		{
			dataField: 'no-of-chaires',
			text: 'No of Chaires',
			sort: true,
			formatter: noOfChairesColumnFormatter,
		},
		{
			dataField: 'floor',
			text: 'Floor',
			sort: true,
			formatter: floorColumnFormatter,
		},
		{
			dataField: 'room',
			text: 'Room',
			sort: true,
			formatter: roomColumnFormatter,
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
						heading="Table List"
						subheading="List of all the tables."
						icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
					/>
				</Col>
				<Col lg="4">
					<div className="app-page-title">
						<div className="page-title-wrapper">
							<div className={cx("page-title-icon")} style={{ boxShadow: "0 0 black", background: "none"}}></div>
							<div className="page-title-actions">
								<Link to="/add-table"><Button color="primary">Add Table</Button></Link>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<TableList columns={columns} data={tables} update={updateTables} delete={deleteTables} />
		</Fragment>
	)
}

export default TableLists;
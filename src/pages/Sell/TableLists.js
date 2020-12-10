import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Card } from 'reactstrap';

const TableLists = (props) => {
	const { tables, getTables, status } = props;

	useEffect(() => {
		!tables.length && getTables();
	}, [getTables, tables.length]);
	
	if (!tables.length) return null;

	let tableList = tables.filter(item =>  {
			if(status === 'free' && item.status === 'Available') {
				return true
			}
			if(status === 'occupied' && item.status === "Occupied") {
				return true
			}
	});

	const createOrder = (event) => {
		let orderData = {
			orderCategory: "RestaurantIn",
			tableid: event.currentTarget.dataset.tableid
		}
		props.createOrder(orderData);
		props.setOrderCategory('RestaurantIn');
		props.setCurrentTable(event.currentTarget.dataset.tableid);
	}

	return (
		<Fragment>
			<Row>
				{
					tableList.map(item => {
						return <Col md="3" key={item.id} data-tableid={item.id} onClick={createOrder}>
							<Card body className="card-shadow-primary border mb-3" style={{cursor:"pointer", textAlign: "center" }} 
							outline color={(item.status === 'Available') ?  'success': 'danger'}>
								<div>{item.name}</div>
								<div className={(item.status === 'Available') ?  'text-success': 'text-danger'}>{item.status}</div>
							</Card>
						</Col>
					})
				}
			</Row>
		</Fragment>
	)
}

export default TableLists;
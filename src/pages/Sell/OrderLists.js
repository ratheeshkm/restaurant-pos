import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const OrderLists = (props) => {
	const { getOrderLists, orderLists, orderId } = props;

	useEffect(() => {
		!orderLists.length && getOrderLists();
	}, [getOrderLists, orderLists.length]);
	
	//if (!orderLists.length) return null;

	const setOrderId = (event) => {
		props.setOrderReset();
		props.setOrderId(event.currentTarget.dataset.orderid);
		props.setActiveTab('current');
		props.clearOrderItem();
		props.getOrderItems(event.currentTarget.dataset.orderid);
		props.setCurrentTable(event.currentTarget.dataset.tableid);
		props.setOrderCategory(event.currentTarget.dataset.category);
		props.setPaymentId(event.currentTarget.dataset.paymentid);
	}
	console.log(orderLists);
	return (
		<Fragment>
			<Row>
				{
					orderLists.map(item => {
						return <Col md="3" key={uuidv4()}>
							<Card body className="card-shadow-primary border mb-3" style={{cursor:"pointer", textAlign: "center" }} 
							outline color={(item.status === 'New') ? 'primary' : (item.status === 'InProgress') ? "success" : "info" } 
							data-orderid={item.orderid} 
							data-tableid={item.tableid} 
							data-category={item.ordercategory}
							data-paymentid={item.paymentid}  
							onClick={setOrderId}>
								<div>&nbsp;{item.name}</div>
								<div>{item.ordercategory}</div>
								<div>{item.orderid}</div>
								<div className={(item.status === 'New') ? 'text-primary' : (item.status === 'InProgress') ? "text-success" : "text-info" }>{item.status}</div>
							</Card>
						</Col>
					})
				}
				{
					!orderLists.length && <div className="no-orders"> No Orders</div>
				}
			</Row>
		</Fragment>
	)
}

export default OrderLists;
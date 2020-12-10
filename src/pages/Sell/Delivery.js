import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

const Delivery = (props) => {
	const { orderLists, getOrderLists } = props;
	useEffect(() => {
		!orderLists.length && getOrderLists();
	}, [getOrderLists, orderLists.length]);

	const createOrder = (event) => {
		props.setOrderReset();
		let orderData = {
			orderCategory: "Delivery"
		}
		props.createOrder(orderData);
		props.setOrderCategory('Delivery');
	}

	const setOrderId = (event) => {
		props.setOrderReset();
		props.setOrderId(event.currentTarget.dataset.orderid);
		props.setActiveTab('current');
		props.clearOrderItem();
		props.getOrderItems(event.currentTarget.dataset.orderid);
		props.setOrderCategory(event.currentTarget.dataset.category);
		props.setPaymentId(event.currentTarget.dataset.paymentid);
	}

	const deliveryList = orderLists.filter(item => item.ordercategory === 'Delivery');

	return(
		<Fragment>
			<Row>
			 	<Col md="3">
					<Card body className="card-shadow-primary border mb-3" style={{cursor:"pointer", textAlign: "center" }} 
					outline color="primary" onClick={createOrder}>
							<div>New</div>
							<div>Delivery</div>
					</Card>
				</Col>
				{
					deliveryList.map(item => {
						return <Col md="3" key={uuidv4()}>
							<Card body className="card-shadow-primary border mb-3" style={{cursor:"pointer", textAlign: "center" }} 
							outline color={(item.status === 'New') ? 'primary' : (item.status === 'InProgress') ? "success" : "info" } 
							data-orderid={item.orderid} 
							data-tableid={item.tableid} 
							data-category={item.ordercategory}
							data-paymentid={item.paymentid}   
							onClick={setOrderId}>
								<div>{item.ordercategory}</div>
								<div>{item.orderid}</div>
								<div className={(item.status === 'New') ? 'text-primary' : (item.status === 'InProgress') ? "text-success" : "text-info" }>{item.status}</div>
							</Card>
						</Col>
					})
				}
			</Row>
		</Fragment>
	)
}

export default Delivery
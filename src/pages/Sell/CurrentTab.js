import React, { Fragment, useEffect, useState } from 'react';
import {
	Row, Col, Nav, NavItem, NavLink, Card, Button, CardTitle
} from 'reactstrap';
import OrderItemsContainer from './OrderItemsContainer';

const CurrentTab  = (props) => {
	const [ categoryId, setCategoryId ] = useState("all");
	const [ payment, setPayment ] = useState(false);

	const { categories, getCategories, getInventory, inventory, saveOrderItem, paymentType, 
		paymentId, items, orderId, orderCategory, currentTable } = props;
	let paymentDetails = "";
	
	useEffect(() => {
		!categories.length && getCategories();
	}, [getCategories, categories.length]);

	useEffect(() => {
		 !inventory.length && getInventory();
	}, [getInventory, inventory.length]);

	useEffect(() => {
		setPayment(paymentId ? true : false)
	}, [paymentId]);
	
	if(!categories.length || !inventory.length) {
		return null;
	}
	
	const handleSetCategoryId = (event) => {
		setCategoryId(event.currentTarget.dataset.categoryid);
	}
	
	const inventoryList = inventory.filter(item =>  {
		if(categoryId === 'all') {
			return item;
		} else if(categoryId === item.categoryid) {
			return item;
		}
		return false;	
	});

	const handleAddItem = (event) => {
		let item = inventory.filter(item => item.id.toString() === event.currentTarget.dataset.inventoryid);
		let isExistingItem = items.findIndex(itemList => itemList.inventoryid === item[0].inventoryid && itemList.orderid === orderId );
		isExistingItem === -1 && saveOrderItem(item);
	}

	let initialValue = 0
	let total = items.length && items.reduce(function (accumulator, currentValue) {
			return accumulator + parseInt(currentValue.price, 10);
	}, initialValue)

	const handleCharge = (value) => {
		setPayment(true);
		props.initiatePayment(orderId);
	}

	const handleRecievedPayment = () => {
		const paymentInfo = {
			...paymentDetails,
			paymentId: paymentId,
			paymentType: paymentType,
			paymentStatus: "Completed",
			currentTable: currentTable,
			orderId: orderId
		}
		props.setPayment(paymentInfo)
		.then(() => {
			if(orderCategory === 'RestaurantIn') {
				props.setOrderReset();
				props.setTableReset();
			}
		})
		if(orderCategory === 'Delivery' || orderCategory === 'TakeAway') {
			let deliveryDetails = {
				...paymentDetails,
				orderid: orderId
			}
			props.setDelivery(deliveryDetails)
			.then(() => {
				props.setOrderReset();
				props.setTableReset();
			})
		}
	}

	const setPaymentType = (event) => {
		props.setPaymentType(event.currentTarget.dataset.type)
	}

	const OrderView = () => {
		return(
			<Fragment>
					<Col lg="2">
							<Nav vertical id="categorisList">
									<NavItem className="nav-item-header">
											Categories
									</NavItem>
									<NavItem className={`${categoryId === 'all' ? 'active' : ""}`} data-categoryid="all" key={`"categoryId-all"`} 
									onClick={handleSetCategoryId}>
											<NavLink>All</NavLink>
									</NavItem>
									{
										categories.map(item => {
											return <NavItem className={`${categoryId === item.id ? 'active' : ""}`} data-categoryid={item.id} key={`"categoryId-${item.id}"`} onClick={handleSetCategoryId}>
													<NavLink>{item.name}</NavLink>
											</NavItem>
										})
									}
							</Nav>
					</Col>
					<Col lg="10">
						<Row>
							<Col lg="6">
								<Row>
										{
											inventoryList.map(item => {
												return <Col md="3" key={`Inventory-${item.id}`} data-inventoryid={item.id} onClick={handleAddItem}>
													<Card body className="card-shadow-primary border mb-3" style={{cursor:"pointer", textAlign:"center"}} outline color="primary">
													<CardTitle>{item.name}</CardTitle>
													{item.status}
											</Card></Col>
											})
										}
								</Row>
							</Col>
							<Col lg="6">
								<OrderItemsContainer handleCharge={handleCharge} />
							</Col>
						</Row>
					</Col>
			</Fragment>
		)
	}

	const getPaymentInfo = (paymentInfo) => {
		paymentDetails = paymentInfo;
	}
	
	const PaymentView = (props) => {
		const [ paymentInfo, setPaymentInfo ] = useState({
			name: "",
			phoneNumber: "",
			shippingAddress: "",
			city: "",
			zipCode: ""
		});
		const { getPaymentInfo } = props;

		useEffect(() => {
			getPaymentInfo(paymentInfo);
		});

		const handleChange = (e) => {
			const { name, value } = e.target;
			setPaymentInfo((prevState) => ({
				...prevState,
				[name]: value
			}));
		}
	
		return(
			<Fragment>
					<Col lg="6">
						<Row id="paymentType">
							<Col lg="12">
								<h5>Payment Type</h5>
							</Col>
							<Col lg="12">
								<Button outline={paymentType !== 'Cash'} className="mb-2 mr-2 btn-transition" color="primary" data-type="Cash" onClick={setPaymentType}>
									Cash
								</Button>
								<Button outline={paymentType !== 'Card'} className="mb-2 mr-2 btn-transition" color="primary" data-type="Card" onClick={setPaymentType}>
									Credit / Debit Card
								</Button>
								<Button outline={paymentType !== 'Other'} className="mb-2 mr-2 btn-transition" color="primary" data-type="Other" onClick={setPaymentType}>
									Other
								</Button>
							</Col>
							<Col lg="12">
								<Button className="mb-2 mr-2" color="dark" onClick={() => setPayment(false)}>Back</Button>
								<Button className="mb-2 mr-2" color="success" onClick={handleRecievedPayment}>Recieved Amount INR {total}</Button>
							</Col>
						</Row>
					</Col>
					<Col lg="6">
						<Row id="">
							<Col lg="12">
								<h5>{orderCategory}</h5>
							</Col>
							<Col lg="12">
									<Row>
										<Col lg="6">
												<div className="form-group">
													<label htmlFor="Name">Name</label>
													<input name="name" data-testid="name" type="text" className="form-control" aria-invalid="false" 
													value={paymentInfo.name} onChange={handleChange} />
													<div className="text-danger"></div>
												</div>
											</Col>
											<Col lg="6">
												<div className="form-group">
													<label htmlFor="PhoneNumber">Phone Number</label>
													<input name="phoneNumber" data-testid="phoneNumber" type="text" className="form-control" 
													aria-invalid="false" value={paymentInfo.phoneNumber} onChange={handleChange} />
													<div className="text-danger"></div>
												</div>
											</Col>`
									</Row>
							</Col>
							{
								(orderCategory === 'Delivery' || orderCategory === 'TakeAway') && <Col lg="12">
									<Row>
											<Col lg="12">
											<div className="form-group">
												<label htmlFor="Shipping Address" >Shipping Address</label>
												<input name="shippingAddress" data-testid="shippingAddress" type="text" className="form-control" 
												aria-invalid="false" value={paymentInfo.shippingAddress} onChange={handleChange} />
												<div className="text-danger"></div>
											</div>
											</Col>
									</Row>
									<Row>
										<Col lg="6">
												<div className="form-group">
													<label htmlFor="City">City</label>
													<input name="city" data-testid="city" type="text" className="form-control" aria-invalid="false" 
													value={paymentInfo.city} onChange={handleChange} />
													<div className="text-danger"></div>
												</div>
											</Col>
											<Col lg="6">
												<div className="form-group">
													<label htmlFor="zipCode">Zip Code</label>
													<input name="zipCode" data-testid="zipCode" type="text" className="form-control" aria-invalid="false"
													 value={paymentInfo.zipCode} onChange={handleChange} />
													<div className="text-danger"></div>
												</div>
											</Col>`
									</Row>
								</Col>
							}
						</Row>
					</Col>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<Row>
				{
					!payment && <OrderView />
				}
				{
					payment && <PaymentView getPaymentInfo={getPaymentInfo}/>
				}
			</Row>
		</Fragment>
	)
}	

export default CurrentTab;
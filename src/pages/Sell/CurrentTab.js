import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Nav, NavItem, NavLink, Card, Button, CardTitle, CardImg, CardBody } from 'reactstrap';
import OrderItemsContainer from './OrderItemsContainer';
import { v4 as uuidv4 } from 'uuid';
import { toast, Bounce } from 'react-toastify';

const CurrentTab  = (props) => {
	const [ categoryId, setCategoryId ] = useState("all");
	const [ payment, setPayment ] = useState(false);

	const { categories, getCategories, getInventory, inventory, saveOrderItem, paymentType, 
		paymentId, items, orderId, orderCategory, currentTable, getProducts, products } = props;
	let paymentDetails = "";
	
	useEffect(() => {
		!categories.length && getCategories();
	}, [getCategories, categories.length]);

	useEffect(() => {
		 !inventory.length && getInventory();
	}, [getInventory, inventory.length]);

	useEffect(() => {
		!products.length && getProducts();
 }, [getProducts, products.length]);

	useEffect(() => {
		setPayment(paymentId ? true : false)
	}, [paymentId]);
	
	if(!categories.length || !inventory.length) {
		return null;
	}

	let productList = products.map(item => {
		let productInventory = inventory.filter(invItem => invItem.id === item.inventoryid);
		return {...item, ...productInventory[0], quantity:1};
	});

	if(categoryId !== 'all') {
		productList = productList.filter(item => item.categoryid === categoryId);
	}

	const handleSetCategoryId = (event) => {
		setCategoryId(event.currentTarget.dataset.categoryid);
	}
	
	const handleAddItem = (event) => {
		let item = productList.filter(item => item.id.toString() === event.currentTarget.dataset.productid);
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
			orderId: orderId,
			paymentAmount: total
		}
		console.log(paymentInfo)
	
		props.setPayment(paymentInfo)
		.then(() => {
			if(orderCategory === 'RestaurantIn') {
				props.setOrderReset();
				props.setTableReset();
				toast("Order Completed", {
					transition: Bounce,
					closeButton: true,
					autoClose: 5000,
					position: 'top-right',
					type: 'success'
				})
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
				toast("Order Completed", {
					transition: Bounce,
					closeButton: true,
					autoClose: 5000,
					position: 'top-right',
					type: 'success'
				})
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
											productList.map(item => {
												return <Col md="5" key={uuidv4()} data-productid={item.id} onClick={handleAddItem}>
														<Card body className="card-shadow-primary border mb-3" style={{cursor:"pointer", textAlign:"center", padding:"5px"}} outline color="primary">
															<CardImg top width="100%" src={'http://localhost:5000/' + item.image} alt="Card image cap" />
															<CardTitle style={{height:"60px", margin:"10px 0px 0px 0px", padding:"5px"}}>{item.name}</CardTitle>
														</Card>
												</Col>
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
		console.log("paymentDetails-->", paymentDetails)
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
													value={paymentInfo.name} onChange={handleChange} autoComplete="off" />
													<div className="text-danger"></div>
												</div>
											</Col>
											<Col lg="6">
												<div className="form-group">
													<label htmlFor="PhoneNumber">Phone Number</label>
													<input name="phoneNumber" data-testid="phoneNumber" type="text" className="form-control" 
													aria-invalid="false" value={paymentInfo.phoneNumber} onChange={handleChange}  autoComplete="off" />
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
import React, { Fragment, useState, useRef } from 'react';
import { Row, Col,  CardFooter, Card, CardBody, Button , CardHeader, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast, Bounce } from 'react-toastify';
import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from './ComponentToPrint';
import ProdQty from './ProdQty';

const OrderItems  = (props) => {
	const [ modal, setModal ] = useState(false);
	const componentRef = useRef(null);
	let { tables, currentTable, items, orderId, getTables, orderCategory, currency, updateOrderItemDb, deleteOrderItem } = props;
	
	useEffect(() => {
		!tables.length && getTables();
	}, [getTables, tables.length])

	if(!tables || !items.length) return null;
	const table = tables && tables.filter(item => item.id === currentTable);
	let initialValue = 0
	let total = items.length && items.reduce(function (accumulator, currentValue) {
			return accumulator + parseInt(currentValue.price, 10) * parseInt(currentValue.quantity, 10);
	}, initialValue)

	const handleCharge = () => {
		props.handleCharge();
	}
	
	const handleOrderTicket = () => {
		let order = {
			currentTable: currentTable,
			items: items
		}
		props.createOrder(order)
			.then((result) => {
				if (result) {
					toast("Order ticket Generated", {
						transition: Bounce,
						closeButton: true,
						autoClose: 5000,
						position: 'top-right',
						type: 'success'
					})
			}
		});
	}

	const toggle = () => {
		setModal(!modal)
	}

	const orderTicket = () => {
		//toggle();
	}

	const updateItemQty = (qty, item, itemId) => {
		const itemToUpdate = {
			...item,
			quantity: qty
		}
		console.log("itemToUpdate--", itemToUpdate)
		parseInt(item.quantity, 10) !== qty && updateOrderItemDb(itemToUpdate, itemId)
	}

	const deleteItem = (event) => {
		event.currentTarget.dataset.itemid && deleteOrderItem(event.currentTarget.dataset.itemid)
	}
	return (
		<Fragment>
			<Row>
				<Col>
					<Card className="main-card mb-3">
							<CardHeader>
								<div style={{margin: "0 auto", textAlign: "center"}}>
									<div>{orderCategory} {(table.length && table[0].name) ? "- " + table[0].name : " " }</div>
									<div>{orderId}</div>
								</div>
							</CardHeader>
							<CardBody>
								<Table striped className="mb-0">
									<thead>
										<tr>
											<th>#</th>
											<th>Item</th>
											<th>Quantity</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										{
											items.map((item, index) => {
												return <tr key={`item-${uuidv4()}`}>
													<th scope="row">{index + 1}</th>
													<td>{item.name}</td>
													<td>
														<ProdQty itemQty={item.quantity} itemId={item.id} item={item} updateItemQty={updateItemQty} />
													</td>
													<td>{item.price * item.quantity}</td>
													<td><div data-itemid={item.id} onClick={deleteItem} className="metismenu-icon pe-7s-close-circle"></div></td>
												</tr>
											})
										}
									</tbody>
								</Table>
							</CardBody>
							<CardFooter>
								<Col lg="6" style={{textAlign: "left"}}>
									<Button className="mb-12 mr-12 btn-transition" color="primary" onClick={toggle}>Order Ticket</Button>
									<Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Order Ticket</ModalHeader>
                    <ModalBody>
                      <ComponentToPrint ref={componentRef} items={items} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={toggle}>Go Back</Button>
												<ReactToPrint
													trigger={() => <Button color="primary" onClick={orderTicket} >Order Ticket</Button> }
													content={() => componentRef.current }
												/>
												
                    </ModalFooter>
                </Modal>
								</Col>
								<Col lg="6" style={{textAlign: "right"}}>
									<Button className="mb-12 mr-12 btn-transition" color="primary" onClick={handleCharge}>Charge {currency} {total}</Button>
								</Col>
							</CardFooter>
					</Card>
				</Col>
			</Row>
		</Fragment>
	)
}	

export default OrderItems;
import React, { Fragment } from 'react';
import { useState } from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../Layout/AppMain/PageTitle';
import {
	TabContent, TabPane, Nav, NavItem, NavLink, CardHeader, Card, CardBody
} from 'reactstrap';
import classnames from 'classnames';
import TableListContainer from './TableListContainer';
import CurrentTabContainer from './CurrentTabContainer'
import TakeAwayContainer from './TakeAwayContainer';
import DeliveryContainer from './DeliveryContainer';
import OrderListContainer from './OrderListContainer';
 
const OrderCategory = ({orderCategory}) => {
	const ReturnComp = () => {
		switch(orderCategory) {
			case 'orders': 
				return <OrderListContainer />
			case 'table-free': 
				return <TableListContainer status={'free'} />
			case 'table-occupied': 
				return <TableListContainer status={'occupied'} />
			case 'takeAway': 
				return <TakeAwayContainer />
			case 'delivery': 
				return <DeliveryContainer />
			default:
				return null;
		}
	}

	return (
		<ReturnComp />
	)
}

function OrdersTab() {
	const [ orderCategory, setOrderCategory ] = useState("orders");
	return(
			<Row>
					<Col lg="2">
							<Nav vertical>
									<NavItem className={`${orderCategory === 'orders' ? 'active' : ""}`}>
											<NavLink onClick={() => setOrderCategory('orders')}>Orders</NavLink>
									</NavItem>
									<NavItem className="nav-item-header">
											Table
									</NavItem>
									<NavItem className={`${orderCategory === 'table-free' ? 'active' : ""}`}>
											<NavLink className="child" onClick={() => setOrderCategory('table-free')}>Free</NavLink>
									</NavItem>
									<NavItem className={`${orderCategory === 'table-occupied' ? 'active' : ""}`}>
											<NavLink className="child"  onClick={() => setOrderCategory('table-occupied')}>Occupied</NavLink>
									</NavItem>
									<NavItem className={`${orderCategory === 'takeAway' ? 'active' : ""}`}>
											<NavLink onClick={() => setOrderCategory('takeAway')}>
													Take Away
											</NavLink>
									</NavItem>
									<NavItem className={`${orderCategory === 'delivery' ? 'active' : ""}`}>
											<NavLink onClick={() => setOrderCategory('delivery')}>
													Delivery
											</NavLink>
									</NavItem>
							</Nav>
					</Col>
					<Col lg="10">
						<OrderCategory orderCategory={orderCategory} />
					</Col>
			</Row>           
	)
}

function OrdersTabs({activeTab, toggleTab}) {
  return (
    <Card tabs="true" className="mb-3">
			<CardHeader>
				<Nav justified>
					<NavItem>
						<NavLink className={classnames({active: activeTab === 'orders'})} onClick={() => { toggleTab('orders');}}>
							Orders
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink 
							className={classnames({active: activeTab === 'current'})}
							onClick={() => { toggleTab('current'); }}>
						Current
						</NavLink>
					</NavItem>
				</Nav>
			</CardHeader>
			<CardBody>
					<TabContent activeTab={activeTab}>
						<TabPane tabId="orders">
								<OrdersTab />
						</TabPane>
						<TabPane tabId="current">
								<CurrentTabContainer />
						</TabPane>
					</TabContent>
				</CardBody>
		</Card>
  );
}

const Orders = (props) => {
	const { activeTab, setActiveTab, orderId } = props;
	function toggleTab(tab) {
		if (orderId && activeTab !== tab) {
			setActiveTab(tab)
		}
	}
	return(
		<Fragment>
			<Row>
				<Col lg="12">
					<PageTitle
						heading="Orders"
						subheading="Creating orders on different category"
						icon="pe-7s-shopbag icon-gradient bg-happy-itmeo"
					/>
				</Col>
			</Row>
			<Row>
				<Col lg="12">
					<OrdersTabs activeTab={activeTab} toggleTab={toggleTab} />
				</Col>
			</Row>
		</Fragment>
	)
} 

export default Orders;
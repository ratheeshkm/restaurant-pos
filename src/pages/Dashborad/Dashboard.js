import React, { Fragment, useState} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { Row, Col, Card } from 'reactstrap';
import PageTitle from '../../Layout/AppMain/PageTitle';
import { v4 as uuidv4 } from 'uuid';

const Dashborad = (props) => {
	const { getCompletedOrders, completedOrders } = props;
	useState(() => {
		getCompletedOrders();
	}, [])
	let newCustomers = 0;
	let customerList = [];
	let totalSales = 0;
	for(let item of completedOrders) {
		if(!item.phonenumber) {
			newCustomers++;
		} else {
			if(customerList.indexOf(item.phonenumber === -1)) {
				newCustomers++;
			}
		}
		totalSales += item.paymentamount && parseInt(item.paymentamount, 10);
	}
 
	return (
		<Fragment>
			<AppHeader />
			<div className="app-main">
				<AppSidebar />
				<div className="app-main__outer">
					<div className="app-main__inner">
					<ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="Dashboard"
                            subheading="Gives you insights of your business"
                            icon="pe-7s-home icon-gradient bg-mean-fruit"
                        />
                        <Row>
                            <Col md="12" lg="12">
                                <Row>
                                    <Col md="4">
                                        <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-10"/>
                                                <i className="pe-7s-cash icon-gradient bg-arielle-smile"/>
                                            </div>
                                            <div className="widget-numbers">
																							&#8377; {totalSales}
                                            </div>
                                            <div className="widget-description text-white">
                                                <span className="pl-1">Total sales</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-10"/>
                                                <i className="lnr-menu icon-gradient bg-warm-flame"/>
                                            </div>
                                            <div className="widget-numbers">
                                                {completedOrders.length}
                                            </div>
                                            <div className="widget-description text-white">
                                                <span className="pr-1">Total bills</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="4">
                                        <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-dark opacity-9"/>
                                                <i className="lnr-users text-white"/>
                                            </div>
                                            <div className="widget-numbers">
                                               {newCustomers}
                                            </div>
                                            <div className="widget-description text-white">
                                                <span className="pl-1"> New customers</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <div className="card-header">Completed Orders
                                    </div>
                                    <div className="table-responsive">
                                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th className="text-left">Order #</th>
                                                <th>Category</th>
                                                <th className="text-left">Amount</th>
                                                <th className="text-left">Payment Type</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
																						{
																							completedOrders.length && completedOrders.map( item => <tr key={uuidv4()}>
                                                <td  className="text-left text-muted">{item.orderid}</td>
																									<td>
																											<div className="widget-content p-0">
																													<div className="widget-content-wrapper">
																															<div className="widget-content-left flex2">
																																	<div className="widget-heading">{item.ordercategory}</div>
																															</div>
																													</div>
																											</div>
																									</td>
																									<td className="text-left">{item.paymentamount}</td>
																									<td className="text-left">
																										<div className="widget-heading">{item.paymenttype}</div>
																									</td>
																									<td className="text-center">
																											<button type="button" className="btn btn-primary btn-sm">Details</button>
																									</td>
																								</tr>
																							)
																						}
                                            
                                           </tbody>
                                        </table>
                                    </div>
                                   
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	)
}

export default Dashborad;
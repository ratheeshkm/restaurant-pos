import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import OrderContainers from './OrderContainers';

const Categories = (props) => {
	return (
		<Fragment>
			<AppHeader />
			<div className="app-main">
				<AppSidebar />
				<div className="app-main__outer">
					<div className="app-main__inner">
						<OrderContainers />
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	)
}

export default Categories;
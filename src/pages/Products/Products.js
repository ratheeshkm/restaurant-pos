import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import ProductListContainer from './ProductListContainer';

const Inventory = (props) => {
	return (
		<Fragment>
			<AppHeader />
			<div className="app-main">
				<AppSidebar />
				<div className="app-main__outer">
					<div className="app-main__inner">
						<ProductListContainer />
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	)
}

export default Inventory;
import React, { Fragment } from 'react';
import AppHeader from '../../Layout/AppHeader';
import AppSideBar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import SubCategoryListsContainer from '../SubCategories/SubCategoryListsContainer';

const SubCategories = () => {
	return (
		<Fragment>
			<AppHeader />
			<div className="app-main">
				<AppSideBar />
				<div className="app-main__outer">
					<div className="app-main__inner">
						<SubCategoryListsContainer />
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	)
}

export default SubCategories;


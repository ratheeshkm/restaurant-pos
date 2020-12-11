import {Route, Redirect, Switch } from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import { ToastContainer } from 'react-toastify';

const Dashborad = lazy(() => import('../../pages/Dashborad/DashboardContainer'));

const Categories = lazy(() => import('../../pages/Categories/Category'));
const AddCategory = lazy(() => import('../../pages/Categories/AddCategoryContainer'));
const SubCategories = lazy(() => import('../../pages/SubCategories/SubCategory'));
const AddSubCategory = lazy(() => import('../../pages/SubCategories/AddSubCategoriesContainer'));

const Inventory = lazy(() => import('../../pages/Inventory/Inventory'));
const AddInventory = lazy(() => import('../../pages/Inventory/AddInventoryContainer'));
const EditInventory = lazy(() => import('../../pages/Inventory/EditInventoryContainer'));

const Products = lazy(() => import('../../pages/Products/Products'));
const AddProduct = lazy(() => import('../../pages/Products/AddProdcutContainer'));
const EditProduct = lazy(() => import('../../pages/Products/EditProductContainer'));

const Tables = lazy(() => import('../../pages/Tables/Tables'));
const AddTable = lazy(() => import('../../pages/Tables/AddTableContainer'))

const Login  = lazy(() => import('../../pages/Login/LoginContainer'))
const Home = lazy(() => import('../../pages/Home/HomeContainer'));
const Sell = lazy(() => import('../../pages/Sell/Sell'));

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { loggedIn } = rest;
  return (
		<Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const AppMain = (props) => {
    return (
        <Fragment>
					<Suspense fallback={<div>Loading ....</div>}>
						<Switch>
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/home" {...props}>
								<Home />
							</PrivateRoute>
							<PrivateRoute exact path="/dashboard" {...props}>
								<Dashborad />
							</PrivateRoute>
							<PrivateRoute exact path="/categories" {...props}>
								<Categories />
							</PrivateRoute>
							<PrivateRoute exact path="/add-category" {...props}>
								<AddCategory />
							</PrivateRoute>
							<PrivateRoute exact path="/sub-categories" {...props}>
								<SubCategories />
							</PrivateRoute>
							<PrivateRoute exact path="/add-sub-category" {...props}>
								<AddSubCategory />
							</PrivateRoute>
							<PrivateRoute exact path="/inventory" {...props}>
								<Inventory />
							</PrivateRoute>
							<PrivateRoute exact path="/add-inventory" {...props}>
								<AddInventory />
							</PrivateRoute>
							<PrivateRoute path="/edit-inventory/:id" {...props}>
								<EditInventory/>
							</PrivateRoute>
							<PrivateRoute exact path="/products" {...props}>
								<Products />
							</PrivateRoute>
							<PrivateRoute exact path="/add-product" {...props}>
								<AddProduct />
							</PrivateRoute>
							<PrivateRoute path="/edit-product/:id" {...props}>
								<EditProduct/>
							</PrivateRoute>
							<PrivateRoute exact path="/tables" {...props}>
								<Tables />
							</PrivateRoute>
							<PrivateRoute exact path="/add-table" {...props}>
								<AddTable />
							</PrivateRoute>
							<PrivateRoute exact path="/orders" {...props}>
								<Sell />
							</PrivateRoute>
							<Route exact path="/" component={Login} />
						</Switch>
					</Suspense>
					<ToastContainer />
        </Fragment>
    )
};

export default AppMain;
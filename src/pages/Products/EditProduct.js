import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast, Bounce } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
	//name: yup.string().trim().required('Required'),
	//categoryid: yup.string().trim().required('Required')
});

const EditProduct = (props) => {
	const { categories, subCategories = [], products=[], inventory } = props;
	let product = "";
	const [ subCategoryList,  setSubCategoryList ] = useState();
	const [ productList, setProductList ] = useState({
		inventoryid: '',
		categoryid: '',
		subcategoryid: ''
	});

	let { id } = useParams();
	if(id) {
		product = products && products.filter(item => item.id ===  parseInt(id, 10));
	}

	useEffect(() => {
		setSubCategoryList(subCategories.filter(item => item.categoryId === product[0].categoryid));
	}, [])

	
	useEffect(() => {
		if(product.length) {
			setProductList(prevState => ({
				...prevState,
				...product[0]
			}))
		}
	}, [product.length])
	

	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});

	if (!categories.length) {
		props.getCategories();
	}

	if (!subCategories.length) {
		props.getSubCategories();
	}

	if(!products.length) {
		props.getInventory();
	}
	
	if(!products.length || !categories.length || !subCategories.length || !id) {
		return null;
	}

	const onSubmit = async(data, e) => {
		console.log(data)
		data['id'] = id;
		await props.updateProduct(data)
			.then((result) => {
				if (result) {
					e.target.reset();
					toast("Product Updated", {
						transition: Bounce,
						closeButton: true,
						autoClose: 5000,
						position: 'top-right',
						type: 'success'
					})
			}
		});
	}


	const loadSubCategory = (e) => {
		let subCategory = subCategories.filter(item => item.categoryId === e.target.value);
		setSubCategoryList(subCategories.filter(item => item.categoryId === e.target.value));
		setProductList(prevState => ({
			...prevState,
			subcategoryid: subCategory.length && subCategory[0].id
		}))
	}

	const handleChange = (e) => {
		if(e.currentTarget.dataset.testid === 'categoryid') {
			loadSubCategory(e);
		}
		const { name, value } = e.currentTarget;
		setProductList(prevState => ({
			...prevState,
			[name]: value
		}))
	}

	return (
		<Fragment>
			<AppHeader />
			<div className="app-main">
				<AppSidebar />
				<div className="app-main__outer">
					<div className="app-main__inner">
						<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
						<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Category">Select Inventory</Label>
										<Input type="select"
											name="inventoryid"
											id="inventoryid"
											innerRef={register}
											invalid={!!errors.inventoryid}
											data-testid="inventoryid"
											onChange={handleChange}
											value={productList.inventoryid}
										>
											<option value="">Select Inventory</option>
											{
												inventory.length && inventory.map(item => (
													<option key={uuidv4()} value={item.id}>{item.name}</option>
												))
											}
										</Input>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Category">Select Category</Label>
										<Input type="select"
											name="categoryid"
											id="categoryid"
											innerRef={register}
											invalid={!!errors.categoryid}
											data-testid="categoryid"
											onChange={handleChange}
											value={productList.categoryid}
										>
											<option value="">Select Category</option>{
												categories.length && categories.map(item => (
													<option key={uuidv4()} value={item.id}>{item.name}</option>
												))
											}
										</Input>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Category">Select SubCategory</Label>
										<Input type="select"
											name="subcategoryid"
											id="subcategoryid"
											innerRef={register}
											invalid={!!errors.subCategory}
											data-testid="subcategoryid"
											onChange={handleChange}
											value={productList.subcategoryid}
										>
											<option value="">Select SubCategory</option>
											{
												subCategoryList && subCategoryList.map(item => (
													<option key={uuidv4()} value={item.id}>{item.subCategoryName}</option>
												))
											}
										</Input>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Category">Select Status</Label>
										<Input type="select"
											name="status"
											id="status"
											innerRef={register}
											invalid={!!errors.status}
											data-testid="status"
											onChange={handleChange}
											value={productList.status}
										>
											<option value="">Select Status</option>
											<option value="Active">Active</option>
											<option value="Inactive">Inactive</option>
										</Input>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup><Button color="primary" className="float-right">Submit</Button></FormGroup>
								</Col>
							</Row>
						</form>
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	)
}

export default EditProduct;
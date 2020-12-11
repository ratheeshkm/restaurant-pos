import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast, Bounce } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
	inventory: yup.string().trim().required('Required'),
	category: yup.string().trim().required('Required'),
	//subCategory: yup.string().trim().required('Required')
});

const AddInventory = (props) => {
	const { categories, subCategories, inventory } = props;
	const [ subCategoryList,  setSubCategoryList ] = useState()
	const [ product, setProduct ] = useState({
		inventory: '',
		category: '',
		subCategory: ''
	});
	let history = useHistory();
	if(!inventory) {
		props.getInventory();
	}

	if (!categories) {
		props.getCategories();
	}

	if (!subCategories) {
		props.getSubCategories();
	}
	
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});

	const onSubmit = async(data, e) => {
		await props.addProduct(data)
			.then((result) => {
				if (result) {
					e.target.reset();
					toast("Products Added", {
						transition: Bounce,
						closeButton: true,
						autoClose: 5000,
						position: 'top-right',
						type: 'success'
					})
				history.push("/products")
			}
		});
	}

	const loadSubCategory = (e) => {
		setSubCategoryList(subCategories.filter(item => item.categoryId === e.target.value));
	}

	const handleChange = (e) => {
		if(e.currentTarget.dataset.testid === 'category') {
			loadSubCategory(e);
		}
		const { name, value } = e.currentTarget;
		setProduct(prevState => ({
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
											name="inventory"
											id="inventory"
											innerRef={register}
											invalid={!!errors.inventory}
											data-testid="inventory"
											onChange={handleChange}
											value={product.inventory}
										>
											<option value="">Select Inventory</option>
											{
												inventory && inventory.map(item => (
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
											name="category"
											id="category"
											innerRef={register}
											invalid={!!errors.category}
											data-testid="category"
											onChange={handleChange}
											value={product.category}
										>
											<option value="">Select Category</option>
											{
												categories && categories.map(item => (
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
										<Label for="Category">Select Sub Category</Label>
										<Input type="select"
											name="subCategory"
											id="subCategory"
											innerRef={register}
											invalid={!!errors.subCategory}
											data-testid="subCategory"
											onChange={handleChange}
											value={product.subCategory}
										>
											<option value="">Select Sub Category</option>
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

export default AddInventory;
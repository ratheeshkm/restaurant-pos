import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast, Bounce } from 'react-toastify';
import ImageCrop from '../../components/ImageCrop';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
	name: yup.string().trim().required('Required'),
	quantity: yup.string().trim().required('Required'),
	price: yup.string().trim().required('Required'),
	//description: yup.string().trim().required('Required'),
});

const EditInventory = (props) => {
	let inventoryList = "";
	const { inventory=[] } = props;
	const [ description, setDescription ] = useState("");
	let { id } = useParams();
	if(id) {
		inventoryList = inventory && inventory.filter(item => item.id ===  id);
	}
	useEffect(() => {	
		setDescription(inventoryList.length && inventoryList[0].description);
	}, [inventoryList]);

	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});
	
	if(!inventory.length) {
		props.getInventory();
	}
	
	if(!inventoryList.length || !id) {
		return null;
	}

	const handleDescription = (event) => {
		console.log(event.curentTarget)
	}

	let image = "";
	const onSubmit = async(data, e) => {
		data['id'] = id;
		data['image'] = image;
		data['description'] = description;
		console.log(data)
		await props.updateInventory(data)
			.then((result) => {
				if (result) {
					e.target.reset();
					toast("Inventory Updated", {
						transition: Bounce,
						closeButton: true,
						autoClose: 5000,
						position: 'top-right',
						type: 'success'
					})
			}
		});
	}

	const getImage = (base64Image) => {
		image = base64Image;
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
										<Label for="Name">Name</Label>
										<Input
											type="text"
											name="name"
											innerRef={register}
											invalid={!!errors.name}
											data-testid="name"
											defaultValue={inventoryList[0].name}
										/>
										<div className="text-danger">
											{errors.name && errors.name.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Quantity">Quantity</Label>
										<Input
											type="text"
											name="quantity"
											innerRef={register}
											invalid={!!errors.quantity}
											data-testid="quantity"
											defaultValue={inventoryList[0].quantity}
										/>
										<div className="text-danger">
											{errors.quantity && errors.quantity.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Price">Price</Label>
										<Input
											type="text"
											name="price"
											innerRef={register}
											invalid={!!errors.price}
											data-testid="price"
											defaultValue={inventoryList[0].price}
										/>
										<div className="text-danger">
											{errors.price && errors.price.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Image">Image</Label>
										<ImageCrop getImage={getImage}/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
								<FormGroup>
										<Label for="Description">Description</Label>
										<ReactQuill name="description" theme="snow"  defaultValue={inventoryList[0].description} onBlur={handleDescription}/> 
										<br />
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
											defaultValue={inventoryList[0].status}
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

export default EditInventory;
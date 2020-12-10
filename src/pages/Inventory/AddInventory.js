import React, { Fragment, useState } from 'react';
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

const schema = yup.object().shape({
	name: yup.string().trim().required('Required'),
	quantity: yup.string().trim().required('Required'),
	price: yup.string().trim().required('Required'),
	//description: yup.string().trim().required('Required'),
});

const AddInventory = (props) => {
	const [ description, setDescription ] = useState('');

	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});
	
	let image = "";
	const onSubmit = async(data, e) => {
		data['image'] = image;
		data['description'] = description;
		console.log(data)
		await props.addInventory(data)
			.then((result) => {
				if (result) {
					e.target.reset();
					toast("Inventory Added", {
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
										<ReactQuill name="description" theme="snow" value={description} onChange={setDescription}/> <br />
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
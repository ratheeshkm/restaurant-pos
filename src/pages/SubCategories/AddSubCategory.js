import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
	category: yup.string().trim().required('Required'),
	name: yup.string().trim().required('Required'),
	description: yup.string().trim().required('Required'),
});

const AddSubCategory = (props) => {
	const { categories } = props;
	if (!categories) {
		props.getCategories();
	}
	let history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});
	
	const onSubmit = async (data, e) => {
		await props.addSubCategory(data)
			.then((result) => {
				if (result) {
					e.target.reset();
					toast("Sub Category Added", {
						transition: Bounce,
						closeButton: true,
						autoClose: 5000,
						position: 'top-right',
						type: 'success'
					})
				}
				history.push("/sub-categories")
			});
	}
	if (!categories) return null;
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
										<Label for="Category">Select Category</Label>
										<Input type="select"
											name="category"
											id="category"
											innerRef={register}
											invalid={!!errors.category}
											data-testid="category"
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
										<Label for="Description">Description</Label>
										<Input
											type="textarea"
											name="description"
											innerRef={register}
											invalid={!!errors.description}
											data-testid="description"
										/>
										<div className="text-danger">
											{errors.description && errors.description.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<Button color="primary" className="float-right">Submit</Button>
								</Col></Row>
						</form>
					</div>
					<AppFooter />
				</div>
			</div>
		</Fragment>
	)
}

export default AddSubCategory;
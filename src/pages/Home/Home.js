import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { countries, currencies } from '../../assets/utils/utils';
import { toast, Bounce } from 'react-toastify';
import { Redirect } from "react-router-dom";

const schema = yup.object().shape({
	restName: yup.string().trim().required('Required'),
	country: yup.string().trim().required('Required'),
	currency: yup.string().trim().required('Required')
});

const Home = (props) => {
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});

	if(props.isRestaurantAdded) {
		return <Redirect to={`/dashboard`} />
	}

	const onSubmit = async(data, e) => {
		await props.addRestaurantDetails(data)
		.then((result) => {
			if (result) {
				e.target.reset();
				toast("Restaurant Details Added", {
					transition: Bounce,
					closeButton: true,
					autoClose: 2000,
					position: 'top-right',
					type: 'success'
				});
				props.history.push('/dashboard');
			}
		});
	}
	
	return(
		<Fragment>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
				<Container className="add-restaurant-details">
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }}>
							<FormGroup>
								<Label for="Name">Restaurant Name</Label>
								<Input
									type="text"
									name="restName"
									innerRef={register}
									invalid={!!errors.restName}
									data-testid="restName"
								/>
								<div className="text-danger">
									{errors.restName && errors.restName.message}
								</div>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }}>
							<FormGroup>
								<Label for="Category">Country</Label>
								<Input type="select"
									name="country"
									id="country"
									innerRef={register}
									invalid={!!errors.country}
									data-testid="country"
								>
									<option value="">Select Country</option>
									{
										countries && countries.map(item => (
											<option key={item.code} value={item.code}>{item.name}</option>
										))
									}
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }}>
							<FormGroup>
								<Label for="Currency">Currency</Label>
								<Input type="select"
									name="currency"
									id="currency"
									innerRef={register}
									invalid={!!errors.currency}
									data-testid="currency"
								>
									<option value="">Select Currency</option>
									{
										Object.keys(currencies[0]) && Object.keys(currencies[0]).map((item, index) => {
											const currencyValues = Object.values(currencies[0])[index];
											return <option key={item}  value={item}>{item} - {currencyValues.name}</option>
										})
									}
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<Row>
							<Col sm="12" md={{ size: 6, offset: 3 }}>
								<FormGroup>
									<Label for="No of Floors">No of Floors</Label>
									<Input
										type="text"
										name="noOfFloors"
										innerRef={register}
										invalid={!!errors.noOfFloors}
										data-testid="noOfFloors"
										defaultValue="1"
									/>
									<div className="text-danger">
										{errors.noOfFloors && errors.noOfFloors.message}
									</div>
								</FormGroup>
							</Col>
					</Row>
					<Row>
							<Col sm="12" md={{ size: 6, offset: 3 }}>
								<FormGroup>
									<Label for="No of Rooms">No of Rooms</Label>
									<Input
										type="text"
										name="noOfRooms"
										innerRef={register}
										invalid={!!errors.noOfFloors}
										data-testid="noOfRooms"
										defaultValue="1"
									/>
									<div className="text-danger">
										{errors.noOfRooms && errors.noOfRooms.message}
									</div>
								</FormGroup>
							</Col>
					</Row>
					<Row>
						<Col lg="6" md={{ size: 6, offset: 3 }}>
							<Button className="float-right" color="primary">Next</Button>
						</Col>
					</Row>
				</Container>
			</form>
		</Fragment>
	)
}

export default Home;
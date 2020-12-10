import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import {
	toast,
	Bounce
} from 'react-toastify';

const schema = yup.object().shape({
	name: yup.string().trim().required('Required'),
	noOfChaires: yup.string().trim().required('Required'),
});

const AddTable = (props) => {
	const { register, handleSubmit, errors, reset } = useForm({
		mode: 'onBlur | onChange',
		resolver: yupResolver(schema),
	});
	const onSubmit = async(data, e) => {
		await props.addTable(data)
			.then((result) => {
				if (result) {
					e.target.reset();
					toast("Table Added", {
						transition: Bounce,
						closeButton: true,
						autoClose: 5000,
						position: 'top-right',
						type: 'success'
					})
			}
		});
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
										<Label for="Table Name">Name</Label>
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
										<Label for="noOfChaires">No of Chaires</Label>
										<Input
											type="text"
											name="noOfChaires"
											innerRef={register}
											invalid={!!errors.noOfChaires}
											data-testid="noOfChaires"
										/>
										<div className="text-danger">
											{errors.noOfChaires && errors.noOfChaires.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Floor">Floor</Label>
										<Input
											type="text"
											name="floor"
											innerRef={register}
											invalid={!!errors.floor}
											data-testid="floor"
										/>
										<div className="text-danger">
											{errors.floor && errors.floor.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<FormGroup>
										<Label for="Room">Room</Label>
										<Input
											type="text"
											name="room"
											innerRef={register}
											invalid={!!errors.room}
											data-testid="room"
										/>
										<div className="text-danger">
											{errors.room && errors.room.message}
										</div>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col lg="6">
									<Button className="float-right" color="primary">Submit</Button>
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

export default AddTable;
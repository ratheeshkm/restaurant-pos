import React, { Fragment, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./login.css";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

const Login = (props) => {
	const [ loginError, setLoginError ] = useState(false);
	const { register, handleSubmit, errors } = useForm();
	
	if(props.loggedIn) {
		return <Redirect to={`/home`} />
	}
	
  const onSubmit = async (values) => {
		await props.setLogin(values)
		.then((loginResult) => {
			console.log(loginResult);
			if(loginResult.rowCount > 0) {
				props.getRestaurantDetails(loginResult.rowCount && loginResult.result[0].clientid)
				.then((result) => {
					return <Redirect to={`/home`} />
				})
			} else {
				setLoginError(true);
			}
			
		})
	}
	
  return (
    <Fragment>
      <Container className="login-container">
        <Row className="justify-content-md-center">
          <Col lg="4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="userName"
                  name="userName"
                  ref={register({ required: true })}
                  placeholder="Email / Phone number"
									autoComplete="off"
                />
                {errors.userName && (
                  <Form.Text className="text-muted error">
                    <span className="error">This filed is required</span>
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  ref={register({ required: true })}
                  placeholder="Password"
									autoComplete="off"
                />
                {errors.password && (
                  <Form.Text className="text-muted error">
                    <span className="error">This filed is required</span>
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="userName" >
								{ loginError && <span className="error">Invalid Login</span>}
								{ props.loading && <span className="float-right">Loading...  </span> }
                <Button variant="primary" type="submit"  disabled={props.loading} className="float-right">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Login;
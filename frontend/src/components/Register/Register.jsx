import React from "react";
import "./Register.scss";
import { useRef, useContext } from "react";
import { Context } from "../../Context";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const { setErrors, errors } = useContext(Context);

  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      email: emailInput.current.value,
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:6070/api/user/register", config)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(err);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("where are you:", result);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
    emailInput.current.value = "";
    usernameInput.current.value = "";
    passwordInput.current.value = "";
    alert("You are registered, Please login");
    navigate("/home");
  };
  return (
    <div>
      <Container>
        <Row className="register">
          <Col sm={6} className="register-form">
            <Form onSubmit={submitHandler} className="the-form">
              <h5>Register yourself here</h5>
              <ListGroup className="input-container">
                <ListGroup.Item variant="info">
                  <FormControl
                    type="text"
                    ref={usernameInput}
                    placeholder="your name"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="warning">
                  <FormControl
                    type="email"
                    ref={emailInput}
                    placeholder="your email"
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="info">
                  <FormControl
                    type="text"
                    ref={passwordInput}
                    placeholder="password"
                  />
                </ListGroup.Item>
              </ListGroup>
              <br />
              <Button variant="outline-dark" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;

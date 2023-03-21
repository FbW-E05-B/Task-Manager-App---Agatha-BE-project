import React from "react";
import "./Login.scss";
import { useContext, useRef } from "react";
import { Context } from "../../Context.jsx";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import pic from "../../images/todo2.jpg";

function Login() {
  const { setUser, setToken } = useContext(Context);
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    fetch("http://localhost:6070/api/user/login", config)
      .then((res) => {
        if (res.status === 401) {
          throw Error("credential failed");
        }

        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (!result.token) {
          return;
        }
        localStorage.setItem("token", JSON.stringify(result.token));
        localStorage.setItem("user", JSON.stringify(result.user));
        setToken(result.token);
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err, "coming from catch");
      });
  };
  return (
    <div className="Login">
      <Container>
        <h1>Task Manager App</h1>
        <Row>
          <Col sm={6} className="home-bg">
            <img src={pic} alt="background pic" />
          </Col>
          <Col sm={6} className="form">
            <h6>Login please!</h6>
            <Form onSubmit={submitHandler}>
              <ListGroup className="input-container">
                <ListGroup.Item variant="info">
                  <FormControl
                    type="email"
                    placeholder="Your email..."
                    ref={emailInput}
                  />
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="input-container">
                <ListGroup.Item variant="warning">
                  <FormControl
                    type="password"
                    placeholder="password"
                    ref={passwordInput}
                  />
                </ListGroup.Item>
              </ListGroup>
              <Button variant="outline-dark" type="submit">
                Login
              </Button>
            </Form>

            <p>
              New here? Please <NavLink to="/register">Register</NavLink>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

import React from "react";
import "./Task.scss";
import { useContext, useEffect, useRef } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";

function Task() {
  const {
    user,
    setToken,
    setUser,
    tasks,
    setTasks,
    token,
    setErrors,
    deleteTask,
    setDeleteTask,
    show,
    setShow,
  } = useContext(Context);
  console.log("user:", user);
  const titleInput = useRef();
  const descriptionInput = useRef();
  const completedInput = useRef();
  const dueDateInput = useRef();

  //^ get all tasks
  useEffect(() => {
    setDeleteTask(false);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://localhost:6070/api/task/allTasks", config)
      .then((res) => {
        if (!res.ok) {
          res.json().then((err) => console.log(err));
          return localStorage.removeItem("user");
        }

        return res.json();
      })
      .then((result) => {
        console.log(result.reverse());
        //^ new tasks show at the top
        setTasks(result);
      });
  }, [deleteTask]);

  //^ post a task
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      title: titleInput.current.value,
      description: descriptionInput.current.value,
      completed: completedInput.current.value,
      dueDate: dueDateInput.current.value,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch("http://localhost:6070/api/task/createTask", config)
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
        console.log(result);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
    titleInput.current.value = "";
    descriptionInput.current.value = "";
    completedInput.current.value = "";
    dueDateInput.current.value = "";
    alert("Your task is saved");
  };

  //^ delete task
  const deleteTaskHandler = (id) => {
    console.log(id);

    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`http://localhost:6070/api/task/delete/${id}`, config)
      .then((res) => {
        alert("task deleted");
        if (!res.ok) {
          res.json().then((result) => console.log(result));
          return;
        }
        return res.json;
      })
      .then((result) => {
        console.log(result);
        setDeleteTask(true);
      });
  };

  //^ Hide function
  const hideHandler = (e) => {
    e.preventDefault();
    setShow(false);
  };

  //^ Show function
  const showHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };

  //^ User logout handler
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <div>
      <Row className="tasks">
        <Col sm={4} className="dashboard">
          <p>
            Logged in as <span>{user.username}</span>
          </p>
          <Button onClick={showHandler} variant="outline-dark">
            Show tasks
          </Button>{" "}
          <Button onClick={hideHandler} variant="outline-dark">
            Hide tasks
          </Button>
          <Button variant="outline-danger" onClick={logoutHandler}>
            Logout
          </Button>
        </Col>

        <Col sm={8} className="tasks-form">
          <h3>
            Hallo <span>{user.username}</span>, write down your tasks
          </h3>
          <hr />
          <Form onSubmit={submitHandler} className="the-form">
            <ListGroup className="input-container">
              <ListGroup.Item variant="info">
                <FormControl
                  type="text"
                  ref={titleInput}
                  placeholder="task title"
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="input-container">
              <ListGroup.Item variant="warning">
                <FormControl
                  type="text"
                  ref={descriptionInput}
                  placeholder="description"
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="input-container">
              <ListGroup.Item variant="info">
                <FormControl
                  type="boolean"
                  ref={completedInput}
                  placeholder="completed task"
                />
              </ListGroup.Item>
            </ListGroup>
            <ListGroup className="input-container">
              <ListGroup.Item variant="warning">
                <FormControl
                  type="date"
                  ref={dueDateInput}
                  placeholder="due date"
                />
              </ListGroup.Item>
            </ListGroup>
            <br />
            <Button variant="outline-dark" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
      <hr />
      <Row className="task-list">
        <ListGroup>
          <ListGroup.Item variant="secondary">
            {show &&
              tasks &&
              tasks.map((task) => (
                <div key={task._id}>
                  <p>
                    <span>Title </span>:{" "}
                    <span className="task-input">{task.title}</span>
                  </p>
                  <p>
                    <span>Description</span>:{" "}
                    <span className="task-input">{task.description}</span>{" "}
                  </p>
                  <p>
                    <span>Completed</span>:{" "}
                    <span className="task-input">{task.completed}</span>{" "}
                  </p>
                  <p>
                    <span>Due Date</span>:{" "}
                    <span className="task-input">{task.dueDate}</span>{" "}
                  </p>
                  <p>
                    <span>Posted on</span>:{" "}
                    <span className="task-input">{task.updatedAt}</span>{" "}
                  </p>
                  <Button
                    onClick={() => deleteTaskHandler(task._id)}
                    variant="outline-dark"
                  >
                    Delete
                  </Button>
                  <NavLink to="/edit">
                    <Button variant="outline-dark">Edit</Button>
                  </NavLink>
                  <hr />
                </div>
              ))}
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </div>
  );
}

export default Task;

import React from "react";
import { useContext, useEffect, useRef } from "react";
import { Context } from "../../Context";
import Task from "../Tasks/Task";
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

function Edit() {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const completedInput = useRef();
  const dueDateInput = useRef();
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

  const navigate = useNavigate();
  const EditingTask = tasks.find((item) => item.id === item.id);
  //^ edit task
  const editTaskHandler = (id) => {
    console.log("id", id);

    const formData = {
      title: titleInput.current.value,
      description: descriptionInput.current.value,
      completed: completedInput.current.value,
      dueDate: dueDateInput.current.value,
    };

    const config = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`http://localhost:6070/api/task/edit/${id}`, config)
      .then((res) => {
        console.log("id", id);
        if (!res.ok) {
          return res.json().then((err) => {
            console.log(err);
            setErrors(err);
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("from where?", result);
      })
      .catch((err) => {
        setErrors(err);
        console.log(err);
      });
  };
  //^ update handler
  const updateHandler = (id) => {
    //^ updating task input
    if (
      !titleInput.current.value &&
      !descriptionInput.current.value &&
      !completedInput.current.value &&
      !dueDateInput.current.value
    ) {
      return;
    } else {
      const editedTask = tasks.map((item) =>
        item.id === item.id
          ? {
              ...item,
              title: titleInput.current.value,
              description: descriptionInput.current.value,
              completed: completedInput.current.value,
              dueDate: dueDateInput.current.value,
            }
          : item
      );

      setTasks(editedTask);
      navigate("/home");
    }
  };

  return (
    <div className="Edit">
      <Form onSubmit={editTaskHandler} className="the-form">
        <ListGroup className="input-container">
          <ListGroup.Item variant="info">
            <FormControl
              type="text"
              ref={titleInput}
              placeholder="task title"
              defaultValue={EditingTask.title}
            />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="warning">
            <FormControl
              type="text"
              ref={descriptionInput}
              placeholder="description"
              defaultValue={EditingTask.description}
            />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="info">
            <FormControl
              type="boolean"
              ref={completedInput}
              placeholder="completed task"
              defaultValue={EditingTask.completed}
            />
          </ListGroup.Item>
        </ListGroup>
        <ListGroup className="input-container">
          <ListGroup.Item variant="warning">
            <FormControl
              type="date"
              ref={dueDateInput}
              placeholder="due date"
              defaultValue={EditingTask.dueDate}
            />
          </ListGroup.Item>
        </ListGroup>
        <br />
        <Button onClick={updateHandler} variant="outline-dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Edit;

import "./Home.scss";
import React from "react";
import "./Home.scss";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Login from "../Login/Login";
import Task from "../Tasks/Task";
import { Context } from "../../Context";

function Home() {
  const { token } = useContext(Context);
  return <div className="Home">{token ? <Task /> : <Login />}</div>;
}

export default Home;

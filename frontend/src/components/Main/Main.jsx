import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Home from "../Home/Home";
import Edit from "../Edit/Edit";
import Task from "../Tasks/Task";
import "./Main.scss";

import React from "react";

function Main() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home">
          <Route index element={<Home />} />
        </Route>
        <Route path="/register">
          <Route index element={<Register />} />
        </Route>
        <Route path="/edit">
          <Route index element={<Edit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Main;

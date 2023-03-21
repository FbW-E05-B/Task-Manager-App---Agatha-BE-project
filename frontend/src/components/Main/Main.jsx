import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Home from "../Home/Home";
import "./Main.scss";

import React from "react";

function Main() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register">
          <Route index element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Main;

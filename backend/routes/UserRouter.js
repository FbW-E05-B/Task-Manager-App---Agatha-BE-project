import express from "express";
import UserModel from "../model/User.js";
import { hash, compare } from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const UserRouter = express.Router();

//^ new user register
UserRouter.post("/register", async (req, res, next) => {
  try {
    //^ hashing password
    const hashed = await hash(req.body.password, 10);
    //^ reassigning
    req.body.password = hashed;
    const newUser = await UserModel.create(req.body);
    res.send(newUser);
  } catch (error) {
    next(createError(401, error.message));
  }
})

  //^ Customer login
  .post("/login", async (req, res, next) => {
    try {
      //^ Check if customer email exists
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        next(createError(401, "Wrong address"));
        return;
      }
      //^ Comparing the password
      const successLogin = await compare(req.body.password, user.password);
      if (!successLogin) {
        next(createError(401, "Email/password incorrect"));
        return;
      }
      //^ Token
      //^ token expiring time, if it expires, log in again
      const option = { expiresIn: "10min" };
      const token = jwt.sign({ id: user._id }, process.env.SECRET, option);
      //^ send user and token to front end
      res.send({ user, token });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default UserRouter;

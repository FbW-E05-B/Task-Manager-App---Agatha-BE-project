import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";
import connect from "./lib/db.js";
import createError from "http-errors";
import UserRouter from "./routes/UserRouter.js";
import TaskRouter from "./routes/TaskRouter.js";
import { CheckToken } from "./middleware/checkToken.js";

//^ enable .env
dotenv.config();

//^ connect to MongoDB
connect();

//^ define port
const port = process.env.PORT || 6000;

//^ define server
const server = express();

//^ middleware
server.use(logger("dev"));
server.use(cors());

//^ enable body request (POST) object parsing
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//^ start the routes
//! api for posts
server.use("/api/user", UserRouter);
//^ checking the token first, if its true, create a task then
server.use("/api/task", CheckToken, TaskRouter);

//^ something else error
server.use("*", (req, res, next) => {
  next(createError(404, "Page Not Found"));
});

//^ global error handler
server.use((error, req, res, next) => {
  res
    .status(error.status || 400)
    .send({ message: error.message || "unknown error" });
});
//^ start the server
server.listen(port, () => {
  //   process.stdout.write(`Ready on \t http:localhost:${port}`)
  console.log(`Server is running on : http://localhost:${port}`);
});

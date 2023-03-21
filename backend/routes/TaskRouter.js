import express from "express";
import TaskModel from "../model/Task.js";
import UserModel from "../model/User.js";

import createError from "http-errors";

//^ define task router
const TaskRouter = express.Router();

//^ post new task
TaskRouter.post("/createTask", async (req, res, next) => {
  try {
    req.body.author = req.userId;
    console.log(req.userId);
    const newTask = await TaskModel.create(req.body);
    //^ after creating a task, author is added
    const user = await UserModel.findById(req.body.author);
    console.log(user);
    user.tasks.push(newTask._id);
    user.save();
    res.status(200).send(newTask);
  } catch (error) {
    next(createError(401, error.message));
  }
})
  //^ get all tasks
  .get("/allTasks", async (req, res, next) => {
    try {
      const tasks = TaskModel.find({});
      //^ get the content instead of an id, exec means execute
      tasks.populate("author", "username -_id");
      const allTasks = await tasks.exec();
      res.send(allTasks);
    } catch (error) {
      next(createError(500, error.message));
    }
  })
  //^ delete a task
  .delete("/delete/:id", async (req, res, next) => {
    try {
      const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
      if (!deleteTask) {
        next(createError(400, error.message));
        return;
      }
      const author = await UserModel.findById(req.userId);
      //^ removing the deleted message id from the array of tasks
      author.tasks = author.tasks.filter((x) => x.toString() !== req.params.id);
      author.save();
      console.log(deleteTask);
      res.send({ success: true });
    } catch (error) {
      next(createError(500, error.message));
    }
  });

export default TaskRouter;

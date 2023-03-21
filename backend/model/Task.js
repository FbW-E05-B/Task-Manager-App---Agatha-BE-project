import mongoose from "mongoose";

const { Schema, model } = mongoose;

//^ Task Schema
const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, trim: true, default: false },
    dueDate: { type: String, required: true },
    //! connecting user collection into task collection
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//^ Model
const TaskModel = model("Task", TaskSchema);
export default TaskModel;

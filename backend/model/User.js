import mongoose from "mongoose";

const { Schema, model } = mongoose;

//^ User Schema
const UserSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      trim: true,
      unique: true,
      unique: [true, "Email already exists"],
      //^ custom validate to check if it is a valid email address
      validate: {
        validator: (val) => {
          //^ return tue if OK otherwise false
          if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val)) {
            return true;
          } else {
            return false;
          }
        },
        message: (val) => `"${val.value}" is NOT a valid email`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should not be less than 8 char"],
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  //^ preventing the password to be shown
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//^ Model
const UserModel = model("User", UserSchema);
export default UserModel;

import mongoose from "mongoose";

const connect = () => {
  const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
  const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}/${DB_NAME}`;

  //^ avoid strict query warning
  mongoose.set("strictQuery", true);
  mongoose
    .connect(connectionString)
    .then(() => console.log("[DB] Connected"))
    .catch((error) => console.log("[DB ERROR]", error));
};
export default connect;

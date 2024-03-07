import express from "express";
import { connectDB } from "./connect.db.js";
import userRoutes from "./user/user.route.js";
import todoRoutes from "./todo/todo.route.js";
import cors from "cors";

const app = express();

//to make json understand
app.use(express.json());

//connect DB
connectDB();

//use cors
app.use(cors());

//register routes
app.use(userRoutes);
app.use(todoRoutes);

// app port and server
const PORT = 7500;

app.listen(PORT, () => {
  console.log(`App is listening to the port ${PORT}`);
});

import express from "express";
import validateReqBody from "../middleware/validation.middleware.js";
import { todoValidationSchema } from "./todo.validation.js";
import { Todo } from "./todo.model.js";
import { isUser } from "../middleware/authentication.middleware.js";
import checkMongoIdvalidity from "../middleware/mongo.id.validation.middleware.js";

const router = express.Router();

router.post(
  "/add/todo",
  isUser,
  validateReqBody(todoValidationSchema),
  async (req, res) => {
    //extract newTodo from req.body
    const newTodo = req.body;

    //add user
    newTodo.userId = req.loggedInUserId;
    //create newTodo
    await Todo.create(newTodo);

    //send appropriate response

    return res.status(201).send({ message: "Todo created successfully." });
  }
);

router.get("/todo/details", isUser, async (req, res) => {
  //extract todoId from req.params
  const todoId = req.params.id;
  //find Todo
  const todo = await Todo.find(todoId);

  //if not todo throw error

  if (!todo) {
    return res.status(404).send({ message: "no todo is found" });
  }

  //send appropriate response
  return res.status(200).send({ message: "success", todoDetails: todo });
});

router.delete(
  "/delete/todo/:id",
  isUser,
  checkMongoIdvalidity,

  async (req, res) => {
    //extract todo id from req.params
    const todoId = req.params.id;

    //find todo
    const todo = await Todo.findOne({ _id: todoId });

    // if not todo throw error
    if (!todo) {
      return res.status(404).send({ messsage: "no any todos found" });
    }

    //delete todo
    await Todo.deleteOne({ _id: todoId });

    //send appropriate response
    return res.status(200).send({ message: "todo deleted successfully." });
  }
);

router.put(
  "/edit/todo/:id",
  isUser,
  checkMongoIdvalidity,
  validateReqBody(todoValidationSchema),
  async (req, res) => {
    //extract todoId from req.params
    const todoId = req.params.id;

    //find todo

    const todo = await Todo.findOne({ _id: todoId });
    // if not todo throw error
    if (!todo) {
      return res.status(404).send({ message: "no any todos found." });
    }
    //extract newValues from req.body
    const newValues = req.body;

    //update todo
    await Todo.updateOne({ _id: todoId }, { $set: { ...newValues } });

    //send Appropriate response
    return res
      .status(200)
      .send({ message: "the todo is updated successfully." });
  }
);
router.get(
  "/todo/details/:id",
  isUser,
  checkMongoIdvalidity,
  async (req, res) => {
    //extract todoId from req.params
    const todoId = req.params.id;
    //find Todo
    const todo = await Todo.findOne({ _id: todoId });

    //if not todo throw error

    if (!todo) {
      return res.status(404).send({ message: "no todo is found" });
    }

    //send appropriate response
    return res.status(200).send({ message: "success", todoDetails: todo });
  }
);
export default router;

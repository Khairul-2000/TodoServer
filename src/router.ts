import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getOneTodo,
  getTodos,
  updateTodo,
} from "./handlers/todo";

const router = Router();

// Todo: routes

router.get("/todo", getTodos); // get all todos
router.get("/todo/:id", getOneTodo);
router.post("/todo", createTodo); // create a new todo
router.put("/todo/:id", updateTodo); // update a todo
router.delete("/todo/:id", deleteTodo); // delete a todo

export default router;

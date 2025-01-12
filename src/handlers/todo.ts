import db from "../db";

export const getTodos = async (req, res) => {
  try {
    const todos = await db.user.findMany({
      where: {
        id: req.user.id,
      },
      include: {
        Todo: true,
      },
    });
    res.status(200).json({ data: todos });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching todos" });
  }
};

export const getOneTodo = async (req, res) => {
  const id = req.params.id;

  const todo = await db.todo.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  res.json({ todo });
};

export const createTodo = async (req, res) => {
  try {
    const newTodo = await db.todo.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id,
      },
    });

    res.json(newTodo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the todo" });
  }
};

export const updateTodo = async (req, res) => {
  const id = req.params.id;

  const updatedTodo = await db.todo.update({
    where: {
      id,
    },

    data: {
      completed: true,
    },
  });

  res.json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;

  const deletedTodo = await db.todo.delete({
    where: {
      id,
    },
  });

  res.json(deletedTodo);
};

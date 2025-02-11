const Task = require("../models/Task");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all tasks
// @route GET / tasks
// @access private
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().lean();

  if (!tasks?.length) {
    return res.status(404).json({ message: `No Tasks were found` });
  }

  const tasksWithUsername = await Promise.all(tasks.map(async (task, i) => {
    let userId = task.user
    const user = await User.findById(userId).lean().exec()
    const username = user?.username
    return ({...task, username: username}) //{...task, ...user}
  }));

  res.json(tasksWithUsername)
});

// @desc create new task
// @route POST / tasks
// @access private
const createTask = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  if (!title || !text || !user) {
    return res.status("400").json({ message: "All fields are required" });
  } 

  const confirmUser = await User.findById(user).lean().exec()
  
  if (!confirmUser) {
    return res.status(400).json({ message: `User not found` });
  }

  if (!confirmUser.active) {
    return res.status(409).json({message: "User not active"})
  }

  const taskObject = {
    user,
    title,
    text,
  };

  const duplicate = await Task.findOne({title}).lean().exec();

  if (duplicate) {
    return res.status(401).json({message: "Task already exists"})
  }

  const newTask = await Task.create(taskObject);

  if (newTask) {
    return res
      .status(200)
      .json({ message: `${title} has been successfully created` });
  } else {
    return res.status(400).json({ message: "Failed to create task" });
  }
});

// @desc update task
// @route PATCH / tasks
// @access private
const updateTask = asyncHandler(async (req, res) => {
  const { user, id, title, text, completed } = req.body;
  if (!id || !title || !user) {
    return res.status(404).json({ message: "Id and Title are required" });
  }
  const task = await Task.findById(id).exec();

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // const duplicate = await Task.findOne({title}).lean().exec()

  // if (duplicate) {
  //   return res.status(409).json({message: "Duplicate title"})
  // }

  task.user = user
  task.title = title;
  task.text = text;
  task.completed = completed;

  const updatedTask = await task.save();

  res
    .status(200)
    .json({ message: `${updatedTask?.title} updated successfully` });
});

// @desc delete task
// @route DELETE / tasks
// @access private
const deleteTask = asyncHandler(async (req, res) => {
  const { id, user } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Task not found" });
  }
  const task = await Task.findById(id).exec();

  const userFound = await User.findById({id: user}).lean().exec()

  if (!userFound.roles.includes("Manager") || !userFound.roles.includes("Admin")) return res.status("301").json({message: "Unauthorized"})

  const deletedTask = await task.deleteOne();

  if (!deletedTask) {
    return res.status(400).json({ message: "Failed to delete task" });
  }
  const reply = `${task.title} has been deleted`;
  res.json(reply);
});

// const deleteAllTasks = asyncHandler(async (req, res) => {
//   const tasks = await Task.find();
//   if (tasks?.length) {
//     await Task.deleteMany({})
//     return res.status(200).json({message: tasks})
//   } else res.status(400).json({message: `Failed, No of tasks availale: ${tasks?.length}`})
// })

module.exports = { getAllTasks, createTask, updateTask, deleteTask };

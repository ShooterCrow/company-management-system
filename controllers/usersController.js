const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// @desc Get all users
// @route GET / users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No Users Found" });
  }
  res.json(users);
});

// @desc Update a user
// @route POST / users
// @access private
const createnewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are require" });
  }

  //Avoid Duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Username Already Exists" });
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10); //10 salt rounds

  const userObject = {
    username,
    password: hashedPassword,
    roles,
  };

  //Create and store new user
  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New User ${username} Created` });
  } else {
    res
      .status(400)
      .json({ message: "Failed to create user, invalid user data" });
  }
});

// @desc DELETE a user
// @route PATcH / user
// @access private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //Avoid duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.status(200).json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE / user
// @access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes?.length) {
    return res.status(400).json({message: "User has assigned notes"})
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({message: "User not found"})
  }

  const result = user.deleteOne()

  const reply = `Username ${result.username} with ID ${result.id} deleted`

  res.json(reply)
});

module.exports = { getAllUsers, createnewUser, updateUser, deleteUser };

const User = require("../models/userModel");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");
const { extend } = require("lodash");
const validator = require("validator");

exports.signup = BigPromise(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required !!",
    });
  }

  if (!validator.isEmail(email))
    return res.json({
      success: false,
      message: "Enter correct email format.",
    });

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist)
    return res.json({
      success: false,
      message: "Email Already Registered.",
    });

  if (password.length < 6)
    return res.json({
      success: false,
      message: "Password should be of atleast of 6 chars.",
    });

  const user = await User.create(req.body);

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res) => {
  const { email, password } = req.body;

  // If field not recived from body.
  if (!email || !password)
    return res.json({
      success: false,
      message: "Email and Password both required",
    });

  const user = await User.findOne({ email }).select("+password");

  // If user not present in database.
  if (!user)
    return res.json({
      success: false,
      message: "User Doesn't exists in the database.",
    });

  // If password doesn't match.
  if (!(await user.isPasswordValidated(password)))
    return res.json({
      success: false,
      message: "Incorrect Password !!",
    });

  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Success",
  });
});

//User loggedIn Controllers
exports.userDashboard = BigPromise(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});

// Quiz Score Controller
exports.updateUserScore = BigPromise(async (req, res) => {
  const user = req.user;

  const updatedUserScore = extend(user, req.body);

  await user.save();

  res.status(200).json({
    success: true,
    updatedUserScore,
  });
});

// Get All Users (Leaderboard) Controller
exports.getAllUsers = BigPromise(async (req, res) => {
  const users = await User.find();

  const Users = users.map((userdetails) => {
    return {
      userName: userdetails.name,
      score: userdetails.score,
    };
  });

  res.status(200).json({
    success: true,
    Users,
  });
});

// Admin Controllers
exports.adminUsers = BigPromise(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.adminGetUser = BigPromise(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminUpdateUser = BigPromise(async (req, res) => {
  const user = await User.findById(req.params.id);

  const updatedUser = extend(user, req.body);

  await user.save();

  res.status(200).json({
    success: true,
    updatedUser,
  });
});

exports.adminDeleteUser = BigPromise(async (req, res) => {
  const user = await User.findById(req.params.id);

  await user.delete();

  res.status(200).json({
    success: true,
    user,
  });
});

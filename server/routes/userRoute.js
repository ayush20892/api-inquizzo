const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  userDashboard,
  updateUserScore,
  getAllUsers,
  adminUsers,
  adminGetUser,
  adminUpdateUser,
  adminDeleteUser,
} = require("../controllers/userController");

const { isLoggedIn, isRoleAdmissible } = require("../middlewares/user");

// Login Routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Logged In user routes
router.route("/userdashboard").get(isLoggedIn, userDashboard);

// Quiz Score
router.route("/quiz/score").post(isLoggedIn, updateUserScore);

// Get All User
router.route("/users").get(getAllUsers);

// Admin Routes
router
  .route("/admin/users")
  .get(isLoggedIn, isRoleAdmissible("admin"), adminUsers);

router
  .route("/admin/user/:id")
  .get(isLoggedIn, isRoleAdmissible("admin"), adminGetUser)
  .put(isLoggedIn, isRoleAdmissible("admin"), adminUpdateUser)
  .delete(isLoggedIn, isRoleAdmissible("admin"), adminDeleteUser);

module.exports = router;

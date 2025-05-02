const express = require("express");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  generateInviteLink,
  validateInvite,
  deleteUser
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// protected routes
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout",verifyToken, logoutUser);
router.get("/invite-link", verifyToken, generateInviteLink);
router.delete('/delete', verifyToken, deleteUser);

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate-invite/:token", validateInvite);
module.exports = router;

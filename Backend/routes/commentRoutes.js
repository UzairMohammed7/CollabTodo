const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const {
  getAllComments,
  getCommentsByTask,
  addComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/", getAllComments);
router.get("/:taskId", verifyToken, getCommentsByTask);
router.post("/", verifyToken, addComment);
router.delete("/:id", deleteComment);

module.exports = router;

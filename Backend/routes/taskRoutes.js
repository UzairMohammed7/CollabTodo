const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

const {
  getAllTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,

  addPrivateTask,
  getPrivateTasks,
  getSharedTasks,
  generateTaskInviteLink,
  acceptTaskInvite,
  getTaskByToken
} = require("../controllers/taskController");

router.get("/", verifyToken, getAllTasks);
router.post("/", verifyToken, addTask);
router.put("/:id", verifyToken, toggleTaskCompletion);
router.delete("/:id", verifyToken, deleteTask);

router.get("/private", verifyToken, getPrivateTasks);
router.post("/private", verifyToken, addPrivateTask);

router.get("/shared", verifyToken, getSharedTasks);

router.post("/generate-link/:taskId", verifyToken, generateTaskInviteLink);
router.post('/accept-invite/:taskId', verifyToken, acceptTaskInvite)

router.get('/get-task-by-token/:token', verifyToken, getTaskByToken);
module.exports = router;


const Task = require("../models/Task");
const { v4: uuidv4 } = require("uuid");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("createdBy", "name")
      .populate("completedBy", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add task
const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title, createdBy: req.userId });

    const savedTask = await newTask.save();
    const populatedTask = await savedTask.populate("createdBy", "name");

    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle task completion
const toggleTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    task.completedBy = task.completed ? req.userId : null;

    await task.save();

    const populatedTask = await Task.findById(task._id)
      .populate("createdBy", "name")
      .populate("completedBy", "name");

    res.json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.createdBy) !== req.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Private Task
const getPrivateTasks = async (req, res) => {
  try {
    const tasks = await Task.find({isShared: false, createdBy: req.userId}).populate("createdBy", "name")
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get private tasks' });
  }
};

// Add Private Task
const addPrivateTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    createdBy: req.userId,
  });
  res.status(201).json(task);
}

// Get shared tasks
const getSharedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      isShared: true, 
      $or: [
        { sharedWith: req.userId },  // User is invited
        { createdBy: req.userId }    // User is the sharer
      ]
    }).populate("createdBy", "name").populate("completedBy", "name").populate("sharedWith", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to get shared tasks" });
  }
};

// Generate invite link
const generateTaskInviteLink = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task || task.createdBy.toString() !== req.userId.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  const token = uuidv4();
  task.inviteToken = token;
  await task.save();

  const inviteLink = `${process.env.FRONTEND_URL}/accept-invite/${token}`;
  res.json({ inviteLink });
};

// Accept Task invite
const acceptTaskInvite = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });  

    if (!task.isShared) {
      task.isShared = true;
      task.sharedWith.push(req.userId);
      await task.save();
    } else if (!task.sharedWith.includes(req.userId)) {
      task.sharedWith.push(req.userId);
      await task.save();
    }

    res.json({ message: 'Invite accepted. Task is now shared.' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// In taskController.js
const getTaskByToken = async (req, res) => {
  try {
    const task = await Task.findOne({ inviteToken: req.params.token });
    if (!task) return res.status(404).json({ message: 'Invalid invite link' });

    res.json({ taskId: task._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
  getPrivateTasks,
  addPrivateTask,
  getSharedTasks,
  generateTaskInviteLink,
  acceptTaskInvite,
  getTaskByToken
};


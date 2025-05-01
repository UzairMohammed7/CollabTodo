const Comment = require("../models/Comment");

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for a specific task
const getCommentsByTask = async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId })
      .populate("userId", "name");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new comment
const addComment = async (req, res) => {
  try {
    const { text, taskId } = req.body;

    const newComment = new Comment({
      text,
      taskId,
      userId: req.userId,
    });

    const savedComment = await newComment.save();
    const populatedComment = await savedComment.populate("userId", "name");

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Edit a comment
// const editComment = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const updated = await Comment.findByIdAndUpdate(
//       req.params.id,
//       { text },
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  getAllComments,
  getCommentsByTask,
  addComment,
  deleteComment,
};

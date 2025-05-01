const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isShared: { type: Boolean, default: false },
    inviteToken: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);


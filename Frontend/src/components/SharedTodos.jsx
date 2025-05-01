import React from "react";
import CustomURLBar from "./CustomURL";

const SharedTodos = ({
  user,
  sharedTasks,
  completeTask,
  handleDeleteTask,
  comments,
  setComments,
  addComment,
  allComments,
  handleDeleteComment,
}) => {
  return (
    <div className="mt-4">
      <CustomURLBar />
      <ul className="space-y-4">
        {sharedTasks.length === 0 ? (
          <div className="bg-white p-8 mt-2 rounded-lg shadow text-center flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
              alt="No tasks"
              className="w-24 h-24 opacity-50 mb-4"
            />
            <h3 className="text-xl font-medium text-gray-500">
              No tasks Are Added
            </h3>
          </div>
        ) : (
          [...sharedTasks].reverse().map((task) => (
            <li
              key={task._id}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-cyan-400 hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    📝 Created by: <strong>{task.createdBy?.name}</strong>
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    👥 Shared With:{" "}
                    <span className="font-semibold">
                      {[
                        ...new Set(task.sharedWith.map((user) => user.name)),
                      ].map((name, index, arr) => (
                        <span key={index}>
                          {name === user.name ? "You" : name}
                          {index !== arr.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    📅 Created At:{" "}
                    <strong>{new Date(task.createdAt).toLocaleString()}</strong>
                  </p>
                  {task.completed && (
                    <p className="text-sm text-green-600">
                      ✅ Completed by: <strong>{task.completedBy?.name}</strong>
                    </p>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => completeTask(task._id)}
                    className="bg-transparent hover:bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm border-2"
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  {user._id === task.createdBy._id && (
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-transparent hover:bg-red-100 text-red-500 px-3 py-1 rounded-md text-sm border-2"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add comment"
                    value={comments[task._id] || ""}
                    onChange={(e) =>
                      setComments((prev) => ({
                        ...prev,
                        [task._id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addComment(task._id, comments[task._id])
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <button
                    onClick={() => addComment(task._id, comments[task._id])}
                    className="text-blue-500 border border-blue-500 ml-3 px-2 py-1 text-sm rounded-md hover:bg-green-100 transition duration-200"
                  >
                    Send
                  </button>
                </div>
                <ul className="mt-3 space-y-2">
                  {(allComments[task._id] || []).map((comment) => (
                    <li
                      key={comment._id}
                      className="bg-gray-100 p-2 rounded-md flex justify-between items-center"
                    >
                      <span className="text-sm">
                        <strong>{comment.userId?.name || "User"}:</strong>{" "}
                        {comment.text}
                      </span>
                      {user._id === comment.userId._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="bg-transparent hover:bg-red-200 text-red-500 px-2 py-1 rounded text-xs border-2"
                        >
                          Delete Comment
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SharedTodos;

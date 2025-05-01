import React from "react";
import ShareButton from "./ShareButton";
import DeleteButton from "./DeleteButton";

const PrivateTodos = ({
  user,
  privateTitle,
  setPrivateTitle,
  privateTasks,
  addPrivateTask,
  completeTask,
  generateTaskInviteLink,
  handleDeleteTask,
}) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add Private task"
          value={privateTitle}
          onChange={(e) => setPrivateTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addPrivateTask()}
          className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring focus:ring-cyan-400"
        />
        <button
          onClick={addPrivateTask}
          className="bg-cyan-400 hover:bg-cyan-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4 w-full">
        {privateTasks.length === 0 ? (
          <div className="bg-white p-8 mt-2 rounded-xl shadow text-center flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
              alt="No tasks"
              className="w-24 h-24 opacity-50 mb-4"
            />
            <h3 className="text-xl font-medium text-gray-500">
              No tasks added yet
            </h3>
          </div>
        ) : (
          [...privateTasks].reverse().map((task) => (
            <li
              key={task._id}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center border-l-4 border-cyan-500 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => completeTask(task._id)}
                  className="w-5 h-5 accent-green-400 mt-1 sm:mt-0 cursor-pointer rounded-full"
                />
                <h3
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              <div className="flex justify-end gap-2 mt-4 sm:mt-0">
                {user._id === task.createdBy._id && !task.completed && (
                  <button
                    onClick={() => generateTaskInviteLink(task._id)}
                    // className="bg-cyan-500 text-white hover:bg-cyan-600 px-3 py-1 text-sm rounded-md transition duration-200"
                    title="Share Task"
                  >
                    <ShareButton />
                  </button>
                )}
                {user._id === task.createdBy._id && (
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    // className="text-red-500 border border-red-500 px-3 py-1 text-sm rounded-md hover:bg-red-100 transition duration-200"
                    title="Delete Task"
                  >
                    <DeleteButton />
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PrivateTodos;

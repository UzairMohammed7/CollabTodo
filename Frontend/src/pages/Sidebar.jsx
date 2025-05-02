import React from "react";
import { X, Link, Copy } from "lucide-react";
import "./Sidebar.css";
const Sidebar = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  onlineUsers,
  user,
  inviteLink,
  isGeneratingLink,
  copyInviteLink,
  handleLogout,
}) => {
  return (
    <aside
      className={`bg-white w-full md:w-64 shadow-lg fixed md:static z-50 transition-transform duration-300 ease-in-out
        ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
    >
      
      <div className="p-4 ml-1 border-b flex justify-between items-center md:hidden">
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700"
        >
          <X />
        </button>
      </div>

      
      <div className="p-4 md:p-6 border-b bg-white sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <img
            src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border border-green-400 shadow"
          />
          <div>
            <h1 className="text-lg font-semibold text-cyan-600">
              {user?.name}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Online Users
        </h2>
        <ul className="space-y-3">
          {onlineUsers.map(([userId, userData]) => {
            if (!userData?.name) return null;

            return (
              <li
                key={userId}
                className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition p-2 rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 bg-green-100 text-green-700 font-semibold flex items-center justify-center rounded-full shadow">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {userId === user._id ? "You" : userData.name}
                </span>
              </li>
            );
          })}
        </ul>

        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl shadow-sm">
          <p className="text-blue-600 font-semibold mb-2 flex items-center gap-2">
            <Link size={18} /> Invite your friends
          </p>
          <div className="flex flex-col sm:flex-col items-center gap-2">
            <input
              value={inviteLink || "Click copy to generate link"}
              readOnly
              className="w-full px-3 py-2 border rounded text-sm bg-white shadow-inner text-gray-600"
            />
            <button
              onClick={copyInviteLink}
              disabled={isGeneratingLink}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1 disabled:opacity-50"
            >
              {isGeneratingLink ? (
                "Generating..."
              ) : (
                <>
                  <Copy size={16} /> Copy
                </>
              )}
            </button>
          </div>
          {inviteLink && (
            <p className="text-xs text-gray-500 mt-2">
              Link expires in 24 hours
            </p>
          )}
        </div>

        
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl shadow-md transition"
        >
          <svg viewBox="0 0 512 512" className="w-4 h-4 fill-current">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
          <span className="font-medium text-sm">Logout</span>
        </button>

                <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to permanently delete your account? This action cannot be undone."
            );
            if (confirmed) {
              handleDeleteAccount();
            }
          }}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-gray-200 hover:bg-red-100 text-red-600 py-2 px-4 rounded-xl shadow-md transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m6 0V4m-2 0h4"
            />
          </svg>
          <span className="font-medium text-sm">Delete Account</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

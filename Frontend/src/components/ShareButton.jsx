import React from "react";

const share = () => {
  return (
    <div className="group/btn">
      <div className="relative border-4 border-gray-50 bg-cyan-400 p-1 rounded-xl transition-all duration-300 ease-in-out shadow-gray-300/50 hover:cursor-pointer group/item flex items-center justify-center group-hover/btn:scale-98 group-hover/btn:-translate-y-1">
        <button className="gap-1 flex justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-gray-100 dark:text-white group-hover/btn:rotate-180 ease-in-out transition-transform duration-300"
          >
            <path d="M17.5 3a3.5 3.5 0 0 0-3.456 4.06L8.143 9.704a3.5 3.5 0 1 0-.01 4.6l5.91 2.65a3.5 3.5 0 1 0 .863-1.805l-5.94-2.662a3.53 3.53 0 0 0 .002-.961l5.948-2.667A3.5 3.5 0 1 0 17.5 3Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default share;

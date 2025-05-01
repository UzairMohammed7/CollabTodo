import { useState } from "react";

const CustomURLBar = () => {
  const [url, setUrl] = useState("");

  const handleGoClick = () => {
    if (url) {
      const formattedUrl = url.startsWith("http") ? url : `http://${url}`;
      window.location.href = formattedUrl;
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Paste an Invite Link URL"
        value={url}
        onKeyDown={(e) => e.key === "Enter" && handleGoClick()}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded-lg px-3 py-1 mr-2"
      />
      <button
        onClick={handleGoClick}
        className="text-green-500 border border-green-500 px-3 py-1 text-sm rounded-md hover:bg-green-100 transition duration-200"
      >
        Go
      </button>
    </div>
  );
};

export default CustomURLBar;

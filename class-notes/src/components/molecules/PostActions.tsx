import React from "react";

const PostActions: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      alignContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <button className="text-blue-500" style={{ backgroundColor: "#FF6B6B" }}>
      👍 Like
    </button>
    <button className="text-green-500" style={{ backgroundColor: "#757575" }}>
      💬 Comment
    </button>
    <button className="text-gray-500" style={{ backgroundColor: "#007BFF" }}>
      🔄 Share
    </button>
  </div>
);

export default PostActions;

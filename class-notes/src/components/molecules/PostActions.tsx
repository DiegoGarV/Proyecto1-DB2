import React from "react";

interface PostActionProps {
  calificacion: string;
}

const PostActions: React.FC<PostActionProps> = ({ calificacion }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      alignContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "80%",
      }}
    >
      <button className="text-blue-500" style={{ backgroundColor: "#FF6B6B" }}>
        {calificacion} 👍 Like
      </button>
    </div>
    <button className="text-green-500" style={{ backgroundColor: "#757575" }}>
      💬 Comment
    </button>
    <button className="text-gray-500" style={{ backgroundColor: "#007BFF" }}>
      🔄 Share
    </button>
  </div>
);

export default PostActions;

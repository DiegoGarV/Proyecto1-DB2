import React from "react";

const PostActions: React.FC = () => (
  <div className="flex justify-between mt-3">
    <button className="text-blue-500">👍 Like</button>
    <button className="text-green-500">💬 Comment</button>
    <button className="text-gray-500">🔄 Share</button>
  </div>
);

export default PostActions;

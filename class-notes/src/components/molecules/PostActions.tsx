import React, { useState } from "react";
import Button from "../atoms/Button";
import axios from "axios";

interface PostActionProps {
  calificacion: number;
  commentPress: () => void;
  likePress?: () => void;
  savePress?: () => void;
  postId: number;
  userId?: number;
}

const PostActions: React.FC<PostActionProps> = ({
  calificacion,
  commentPress,
  likePress,
  savePress,
  postId,
  userId = 40745258,
}) => {
  const [likes, setLikes] = useState<number>(calificacion);
  const [wasPressed, setWasPressed] = useState<boolean>(false);
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  const onSavePress = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/save_post?user_id=${userId}&post_id=${postId}`
      );

      if (response.data && response.data.mensaje) {
        setHasSaved(true);
      }
    } catch (error) {
      console.error("Error al guardar el post:", error);
    }
    if (savePress) {
      savePress();
    }
  };

  const onLikePress = () => {
    setWasPressed(!wasPressed);
    if (!wasPressed) {
      setLikes((prev) => prev + 1);
    } else {
      setLikes((prev) => prev - 1);
    }
    if (likePress) {
      likePress();
    }
  };

  const onCommentPress = () => {
    commentPress();
  };

  return (
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
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          label={`${likes} 👍`}
          variant="secondary"
          onClick={onLikePress}
        ></Button>
      </div>
      <Button
        label="Comment"
        variant="secondary"
        onClick={onCommentPress}
      ></Button>
      <Button
        label={hasSaved ? "✅ Saved!" : "💾 Save"}
        variant="secondary"
        onClick={onSavePress}
      ></Button>
    </div>
  );
};

export default PostActions;

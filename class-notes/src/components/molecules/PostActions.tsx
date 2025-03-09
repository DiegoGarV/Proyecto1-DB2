import React, { useState } from "react";
import Button from "../atoms/Button";

interface PostActionProps {
  calificacion: number;
  commentPress: () => void;
  likePress?: () => void;
  sharePress?: () => void;
}

const PostActions: React.FC<PostActionProps> = ({
  calificacion,
  commentPress,
  likePress,
  sharePress,
}) => {
  const [likes, setLikes] = useState<number>(calificacion);
  const [wasPressed, setWasPressed] = useState<boolean>(false);
  const [hasShared, setHasShared] = useState<boolean>(false);

  const onSharePress = () => {
    setHasShared(!hasShared);
  };

  const onLikePress = () => {
    setWasPressed(!wasPressed);
    if (!wasPressed) {
      setLikes((prev) => prev + 1);
    } else {
      setLikes((prev) => prev - 1);
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
        label={hasShared ? "✅ Saved!" : "💾 Save"}
        variant="secondary"
        onClick={onSharePress}
      ></Button>
    </div>
  );
};

export default PostActions;

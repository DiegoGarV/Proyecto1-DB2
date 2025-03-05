import React, { useState } from "react";
import Button from "../atoms/Button";

interface PostActionProps {
  calificacion: number;
}

const PostActions: React.FC<PostActionProps> = ({ calificacion }) => {
  const [likes, setLikes] = useState<number>(calificacion);
  const [wasPressed, setWasPressed] = useState<boolean>(false);
  const [hasShared, setHasShared] = useState<boolean>(false);

  const share = () => {
    setHasShared(!hasShared);
  };

  const likesPress = () => {
    setWasPressed(!wasPressed);
    if (!wasPressed) {
      setLikes((prev) => prev + 1);
    } else {
      setLikes((prev) => prev - 1);
    }
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
          onClick={likesPress}
        ></Button>
      </div>
      <Button label="Comment" variant="secondary"></Button>
      <Button
        label={hasShared ? "✅ Shared!" : "🔄 Share"}
        variant="secondary"
        onClick={share}
      ></Button>
    </div>
  );
};

export default PostActions;

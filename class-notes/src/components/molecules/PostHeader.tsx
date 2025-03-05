import React from "react";
import Avatar from "../atoms/Avatar";

interface PostHeaderProps {
  username: string;
  avatar: string;
  date: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ username, avatar, date }) => (
  <div style={styles.container}>
    <div style={styles.profilePic}>
      <Avatar src={avatar} />
    </div>
    <p className="font-bold">{username}</p>
    <p className="text-sm text-gray-500">{date}</p>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    color: "white",
    width: "100%",
    alignSelf: "center",
  },
  profilePic: {},
  userNameCont: {
    display: "flex",
    width: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};

export default PostHeader;

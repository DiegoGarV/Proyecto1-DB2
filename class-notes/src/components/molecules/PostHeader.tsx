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
    <div style={styles.userNameCont}>
      <p className="font-bold">{username}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    paddingRight: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
  profilePic: {
    marginLeft: 10,
    marginRight: 10,
  },
  userNameCont: {
    display: "flex",
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};

export default PostHeader;

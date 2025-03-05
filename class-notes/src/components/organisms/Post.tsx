import React from "react";
import PostHeader from "../molecules/PostHeader";
import PostActions from "../molecules/PostActions";

// interface PostProps {
//   username: string;
//   avatar: string;
//   date: string;
//   content: string;
//   image?: string;
// }

const Post: React.FC<any> = ({ username, avatar, date, content, image }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      <PostHeader username={username} avatar={avatar} date={date} />
    </div>
    <div style={styles.content}>
      <p className="mt-2">{content}</p>
      {image && <img className="mt-2 rounded-lg" src={image} alt={content} />}
    </div>
    <div style={styles.postActions}>
      <PostActions />
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "30%",
    height: 300,
    flexDirection: "column",
    backgroundColor: "#212121",
    borderWidth: 55,
    borderColor: "black",
    padding: 2,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
  },
  header: {
    display: "flex",
    width: "100%",
    height: "15%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#00796B",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    backgroundColor: "white",
  },
  postActions: {
    display: "flex",
    width: "100%",
    backgroundColor: "#F5F5F5",
    height: "10%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
};

export default Post;

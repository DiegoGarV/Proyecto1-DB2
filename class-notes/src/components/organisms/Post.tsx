import React, { useState } from "react";
import PostHeader from "../molecules/PostHeader";
import PostActions from "../molecules/PostActions";
import PostArchives from "../molecules/PostArchives";
import { usePostUser } from "../../services/api";
import CommentsList from "./CommentList";

const Post: React.FC<any> = ({
  username,
  avatar,
  date,
  content,
  archivos,
  title,
  calificacion,
  id,
}) => {
  const { data: user } = usePostUser(id);

  console.warn("user: ", user);

  const [showComments, setShowComments] = useState<boolean>(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <PostHeader username={user?.nombre} avatar={avatar} date={date} />
      </div>
      <div style={styles.content}>
        <div style={styles.titleCont}>{title}</div>
        <div style={{ width: "100%" }}>{content}</div>
        <PostArchives archArr={archivos} />
      </div>
      <div
        style={{
          ...styles.postActions,
          borderBottomLeftRadius: showComments ? 0 : 20,
          borderBottomRightRadius: showComments ? 0 : 20,
        }}
      >
        <PostActions
          calificacion={calificacion}
          commentPress={toggleComments}
        />
      </div>
      {showComments && (
        <div style={{ width: "90%" }}>
          <div style={styles.commentDivisor}></div>
          <div style={styles.commentsCont}>
            <CommentsList postId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "30%",
    flexDirection: "column",
    backgroundColor: "white",
    border: "2px solid black",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    gap: 15,
  },
  header: {
    display: "flex",
    width: "100%",
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
    width: "90%",
    backgroundColor: "white",
    flexDirection: "column",
    // backgroundColor: "green",
    gap: 10,
  },
  postActions: {
    display: "flex",
    width: "100%",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },

  archiveText: {
    display: "flex",
    textOverflow: "ellipsis",
    alignSelf: "center",
    justifyContent: "center",
    justifySelf: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  commentDivisor: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
    borderRadius: 1000,
  },
  titleCont: {
    textAlign: "left",
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderBottomStyle: "solid",
    alignSelf: "flex-start",
    fontSize: 20,
  },
  commentsCont: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
};

export default Post;

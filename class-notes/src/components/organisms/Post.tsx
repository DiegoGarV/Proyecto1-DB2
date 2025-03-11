import React, { useState } from "react";
import PostHeader from "../molecules/PostHeader";
import PostActions from "../molecules/PostActions";
import PostArchives from "../molecules/PostArchives";
import CommentsList from "./CommentList";
import {
  usePostUser,
  useFollowUser,
  useReportPost,
  useFollowedUsers,
} from "../../services/api";

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
  const { data: followedUsers } = useFollowedUsers(); // Usuarios seguidos
  const followUser = useFollowUser();
  const reportPost = useReportPost();

  const [showComments, setShowComments] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleComments = () => setShowComments(!showComments);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Verificar si ya sigues al usuario del post
  const isFollowing = followedUsers?.some((u: any) => u.id === user?.id);

  const handleFollow = () => {
    if (user && !isFollowing) {
      followUser.mutate(user.id);
      setMenuOpen(false);
    }
  };

  const handleReport = () => {
    reportPost.mutate(id);
    setMenuOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <PostHeader username={user?.nombre} avatar={avatar} date={date} />
        {/* Botón de menú ⋮ */}
        <div style={styles.menuContainer}>
          <button onClick={toggleMenu} style={styles.menuButton}>
            ⋮
          </button>
          {menuOpen && (
            <div style={styles.menu}>
              <button
                onClick={handleFollow}
                disabled={isFollowing || followUser.isPending}
              >
                {isFollowing ? "Siguiendo" : "Seguir Usuario"}
              </button>
              <button onClick={handleReport}>Reportar Post</button>
            </div>
          )}
        </div>
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
          postId={id}
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "white",
    flexDirection: "column",
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
  menuContainer: {
    position: "relative",
  },
  menuButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "white",
  },
  menu: {
    position: "absolute",
    top: "25px",
    right: 0,
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    zIndex: 10,
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

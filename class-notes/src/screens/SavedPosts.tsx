import React, { useState } from "react";
import PostList from "../components/organisms/PostList";
import Avatar from "../components/atoms/Avatar";
import userImg from "../assets/usuario/DefaultUser.png";
import { useSavedPosts } from "../services/api";
import { useNavigate } from "react-router-dom";

const SavedPosts: React.FC = () => {
  const { data, isLoading, error } = useSavedPosts(40745258);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.contenedor}>
      <div style={styles.header}>
        <div style={styles.userCont}>
          <div style={styles.userImg}>
            <Avatar src={userImg} size={50} />
          </div>
          <div style={styles.userName}>Usuario</div>
        </div>
        <div style={styles.title}>Saved Posts</div>
        <div style={styles.optionsCont}>
          {" "}
          <div
            style={styles.optionsButton}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Options ▼
          </div>
          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <div
                style={styles.dropdownItem}
                onClick={() => navigate("/home")}
              >
                Home
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={styles.postCont}>
        <PostList data={data} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  contenedor: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#009688",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#009688",
  },
  postCont: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  userName: {},
  userCont: {
    display: "flex",
    width: "33%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    display: "flex",
    width: "33%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 30,
  },
  optionsCont: {
    display: "flex",
    width: "33%",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  optionsButton: {
    cursor: "pointer",
    padding: "8px 12px",
    backgroundColor: "#00796B",
    color: "white",
    borderRadius: "5px",
    userSelect: "none",
  },
  dropdownMenu: {
    top: "100%",
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  dropdownItemHover: {
    backgroundColor: "#f0f0f0",
  },
};

export default SavedPosts;

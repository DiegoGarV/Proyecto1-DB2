import React, { useState } from "react";
import PostList from "../components/organisms/PostList";
import Avatar from "../components/atoms/Avatar";
import userImg from "../assets/usuario/DefaultUser.png";
import { usePosts } from "../services/api";
import DropDown from "../components/molecules/DropDown";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { data, isLoading, error } = usePosts();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.contenedor}>
      <div style={styles.header}>
        <div style={styles.userCont}>
          <div style={styles.userBtn} onClick={() => navigate("/profile")}>
            <div style={styles.userImg}>
              <Avatar src={userImg} size={50} />
            </div>
            <div style={styles.userName}>Usuario</div>
          </div>
        </div>
        <div style={styles.title}>Home</div>
        <div style={styles.optionsCont}>
          <div
            style={styles.optionsButton}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Options ▼
          </div>
          {dropdownOpen && <DropDown />}
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
  userBtn: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    padding: "8px 12px",
    backgroundColor: "#00796B",
    color: "white",
    borderRadius: "5px",
    userSelect: "none",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
};

export default Home;

import React from "react";
import PostList from "../components/organisms/PostList";
import Avatar from "../components/atoms/Avatar";
import userImg from "../assets/usuario/DefaultUser.png";

const Home: React.FC = () => (
  <div style={styles.contenedor}>
    <div style={styles.header}>
      <div style={styles.userCont}>
        <div style={styles.userImg}>
          <Avatar src={userImg} size={50} />
        </div>
        <div style={styles.userName}>Usuario</div>
      </div>
      <div style={styles.title}>Home</div>
      <div style={styles.optionsCont}> Options</div>
    </div>
    <div style={styles.postCont}>
      <PostList />
    </div>
  </div>
);

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
  },
};

export default Home;

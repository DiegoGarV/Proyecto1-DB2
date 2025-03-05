import React from "react";
import PostList from "../components/organisms/PostList";

const Home: React.FC = () => (
  <div style={styles.contenedor}>
    <h1 style={styles.header}>Home</h1>
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
};

export default Home;

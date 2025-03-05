import React from "react";
import PostList from "../components/organisms/PostList";

const Home: React.FC = () => (
  <div style={styles.contenedor}>
    <h1 style={styles.extraCont}>Home</h1>
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
    overflow: "hide",
    backgroundColor: "#009688",
  },
  extraCont: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hide",
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

import React from "react";
import { usePosts } from "../../services/api";
import Post from "./Post";

// interface PostType {
//   id: number;
//   title: string;
//   body: string;
//   username: string;
//   avatar: string;
//   date: string;
//   content: string;
// }

const PostList: React.FC = () => {
  const { data, isLoading, error } = usePosts();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  const randomPosts = data
    ? [...data].sort(() => Math.random() - 0.5).slice(0, 10)
    : [];

  return (
    <div style={styles.container}>
      {randomPosts.map((post: any) => (
        <div style={styles.post} key={post.id}>
          <Post
            id={post.id}
            title={post.titulo}
            body={post.descripcion}
            username="Usuario Desconocido"
            avatar="https://via.placeholder.com/150"
            date={post.fecha.split("T")[0]}
            content={post.descripcion}
          />
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  post: {
    display: "flex",
    marginBottom: 20,
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
};
export default PostList;

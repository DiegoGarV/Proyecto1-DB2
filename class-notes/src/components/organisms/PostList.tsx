import React from "react";
import Post from "./Post";
import Avatar from "../../assets/usuario/DefaultUser.png";

interface PostListProp {
  userId?: number;
  data: any;
  isLoading: boolean;
  error: Error | null;
}

const PostList: React.FC<PostListProp> = ({ data, isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  const postToMap = data
    ? [...data].sort(() => Math.random() - 0.5).slice(0, 10)
    : [];

  // const postToMap = data ? data.slice(1, 2) : [];

  return (
    <div style={styles.container}>
      {postToMap.length === 0 ? (
        <>
          <p
            style={{
              justifySelf: "center",
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            No hay posts guardados...
          </p>
        </>
      ) : (
        <>
          {postToMap.map((post: any) => (
            <div style={styles.post} key={post.id}>
              <Post
                id={post.id}
                title={post.titulo}
                body={post.descripcion}
                username="Usuario Desconocido"
                avatar={Avatar}
                date={post.fecha.split("T")[0]}
                content={post.descripcion}
                calificacion={Number(post.calificacion)}
                archivos={post.archivos}
              />
            </div>
          ))}
        </>
      )}
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
    flexDirection: "column",
  },
};
export default PostList;

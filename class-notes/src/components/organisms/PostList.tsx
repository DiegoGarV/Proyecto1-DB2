import React from "react";
import { usePosts } from "../../services/api";
import Post from "./Post";

interface PostType {
  id: number;
  title: string;
  body: string;
  username: string;
  avatar: string;
  date: string;
  content: string;
}

const PostList: React.FC = () => {
  const { data, isLoading, error } = usePosts();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div style={styles.container}>
      {data?.map((post: PostType) => (
        <div style={styles.post}>
          <Post key={post.id} {...post} />
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

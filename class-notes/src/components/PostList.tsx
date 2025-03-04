import React from "react";
import { usePosts } from "../hooks/usePosts";

const PostList = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los posts</p>;

  return (
    <ul>
      {posts?.map(
        (post: {
          id: React.Key | null | undefined;
          titulo:
            | string
            | number
            | bigint
            | boolean
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
        }) => (
          <li key={post.id}>{post.titulo}</li>
        )
      )}
    </ul>
  );
};

export default PostList;

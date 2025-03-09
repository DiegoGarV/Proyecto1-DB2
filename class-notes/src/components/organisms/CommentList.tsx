import { usePostComments } from "../../services/api";
import Button from "../atoms/Button";
import Comment from "../atoms/Comment";

interface CommentsListProps {
  postId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
  } = usePostComments(postId);

  console.warn("comments on comments list: ", comments);

  return (
    <div>
      {isLoadingComments ? (
        <p>Cargando comentarios...</p>
      ) : errorComments ? (
        <p>Error al cargar los comentarios</p>
      ) : comments.length === 0 ? (
        <p>No hay comentarios para mostrar</p>
      ) : (
        comments.map((comment: any) => {
          return <Comment id={comment.id} content={comment.contenido} />;
        })
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignContent: "center",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <input placeholder="Escribir comentario..." />
        <Button label=">" variant="secondary" padding=" 0px 10px" />
      </div>
    </div>
  );
};

export default CommentsList;

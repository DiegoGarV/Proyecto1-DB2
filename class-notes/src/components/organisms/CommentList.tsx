import { useState } from "react";
import { useCreateComment, usePostComments } from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../atoms/Button";
import Comment from "../atoms/Comment";

interface CommentsListProps {
  postId: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
  } = usePostComments(postId);
  const createCommentMutation = useCreateComment();

  console.warn("Post id", postId);

  const [newComment, setNewComment] = useState<string>("");

  const handleCreateComment = () => {
    if (!newComment.trim()) return;

    createCommentMutation.mutate(
      { postId, content: newComment },
      {
        onSuccess: (newCommentResponse) => {
          setNewComment("");

          queryClient.setQueryData(["postComments", postId], (oldData: any) => {
            return oldData
              ? [...oldData, newCommentResponse.comentario]
              : [newCommentResponse.comentario];
          });
        },
      }
    );
  };

  return (
    <div>
      {isLoadingComments ? (
        <p>Cargando comentarios...</p>
      ) : errorComments ? (
        <p>Error al cargar los comentarios</p>
      ) : comments.length === 0 ? (
        <p>No hay comentarios para mostrar</p>
      ) : (
        comments.map((comment: any, index: number) => (
          <Comment id={comment.id} content={comment.contenido} key={index} />
        ))
      )}
      <div style={styles.commentInput}>
        <input
          placeholder="Escribir comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={createCommentMutation.isPending}
        />
        <Button
          label=">"
          variant="secondary"
          padding="0px 10px"
          onClick={handleCreateComment}
        />
      </div>
      {createCommentMutation.isError && (
        <p style={{ color: "red" }}>Error al enviar el comentario</p>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  commentInput: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
};

export default CommentsList;

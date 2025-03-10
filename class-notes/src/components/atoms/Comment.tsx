import { useState } from "react";
import {
  useCommentReplies,
  useCommentUser,
  useCreateReply,
} from "../../services/api";
import Button from "./Button";
import { useQueryClient } from "@tanstack/react-query";

interface CommentsProps {
  id: number;
  content: string;
}

const Comment: React.FC<CommentsProps> = ({ content, id }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useCommentUser(id);
  const { data: replies, isLoading: isLoadingReplies } = useCommentReplies(id);

  const [showReplies, setShowReplies] = useState(false);

  const createReplyMutation = useCreateReply();

  const [newReply, setNewReply] = useState<string>("");
  const userId = 40745258;

  const handleCreateReply = () => {
    if (!newReply.trim()) return;

    createReplyMutation.mutate(
      { user_id: userId, comentario_post_id: id, contenido: newReply },
      {
        onSuccess: () => {
          setNewReply("");
          queryClient.invalidateQueries({ queryKey: ["commentReplies", id] });
        },
      }
    );
  };

  return (
    <div style={styles.contenedorGeneral}>
      <div style={styles.commentCont}>
        <div style={styles.usuario}>
          {isLoading ? "Cargando..." : user?.nombre || "Desconocido"}
        </div>
        <div style={styles.content}>{content}</div>
        {/* Botón para mostrar/ocultar respuestas */}
        <button
          onClick={() => setShowReplies(!showReplies)}
          style={styles.toggleButton}
        >
          {showReplies ? "Ocultar respuestas" : "Ver respuestas"}
        </button>

        {showReplies && (
          <div style={styles.repliesContainer}>
            {isLoadingReplies ? (
              <p>Cargando respuestas...</p>
            ) : replies && replies.length > 0 ? (
              replies.map((reply: any) => (
                <div style={{ paddingLeft: 20 }} key={reply.id}>
                  <Comment
                    id={reply.id}
                    content={reply.contenido}
                    key={`${reply.id}`}
                  />
                </div>
              ))
            ) : (
              <p>No hay respuestas</p>
            )}

            <div style={styles.commentInput}>
              <input
                placeholder="Escribir respuesta..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                disabled={createReplyMutation.isPending}
              />
              <Button
                label=">"
                variant="secondary"
                padding="0px 10px"
                onClick={handleCreateReply}
              />
            </div>
            {createReplyMutation.isError && (
              <p style={{ color: "red" }}>Error al enviar la respuesta</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  contenedorGeneral: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  commentCont: {
    display: "flex",
    borderRadius: 20,
    backgroundColor: "lightGrey",
    borderWidth: 2,
    borderColor: "black",
    flexDirection: "column",
    padding: 10,
    width: "100%",
  },
  usuario: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    textAlign: "left",
    color: "grey",
    fontSize: 20,
  },
  content: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    textAlign: "left",
    color: "black",
    fontSize: 16,
  },
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

export default Comment;

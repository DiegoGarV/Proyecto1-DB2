import { useState } from "react";
import { useCommentReplies, useCommentUser } from "../../services/api";

interface CommentsProps {
  id: number;
  content: string;
}

const Comment: React.FC<CommentsProps> = ({ content, id }) => {
  const { data: user, isLoading } = useCommentUser(id);
  const { data: replies, isLoading: isLoadingReplies } = useCommentReplies(id);

  const [showReplies, setShowReplies] = useState(false);

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

        {/* Respuestas del comentario */}
        {showReplies && (
          <div style={styles.repliesContainer}>
            {isLoadingReplies ? (
              <p>Cargando respuestas...</p>
            ) : replies && replies.length > 0 ? (
              replies.map((reply: any) => (
                <div style={{ paddingLeft: 20 }}>
                  <Comment
                    key={reply.id}
                    id={reply.id}
                    content={reply.contenido}
                  />
                </div>
              ))
            ) : (
              <p>No hay respuestas</p>
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
};

export default Comment;

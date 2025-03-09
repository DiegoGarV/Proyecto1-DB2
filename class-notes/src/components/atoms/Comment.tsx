import { useCommentUser } from "../../services/api";

interface CommentsProps {
  id: number;
  content: string;
}

const Comment: React.FC<CommentsProps> = ({ content, id }) => {
  const { data: user, isLoading } = useCommentUser(id);

  return (
    <div style={styles.contenedorGeneral}>
      <div style={styles.commentCont}>
        <div style={styles.usuario}>
          {isLoading ? "Cargando..." : user?.nombre || "Desconocido"}
        </div>
        <div style={styles.content}>{content}</div>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../services/api";
import Button from "../components/atoms/Button";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivos, setArchivos] = useState<string[]>([]);
  const [clase, setClase] = useState("");
  const [temas, setTemas] = useState<string[]>([]);
  const [examen, setExamen] = useState(false);
  const [comunidad, setComunidad] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPostMutation.mutate(
      {
        titulo,
        descripcion,
        archivos,
        clase,
        temas,
        examen,
        comunidad,
      },
      {
        onSuccess: () => {
          navigate("/home");
        },
      }
    );
  };

  return (
    <div style={styles.container}>
      <h2>Crear Nuevo Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={styles.textarea}
          required
        />
        <input
          type="text"
          placeholder="Archivos (separados por comas)"
          value={archivos.join(", ")}
          onChange={(e) =>
            setArchivos(e.target.value.split(",").map((str) => str.trim()))
          }
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Clase"
          value={clase}
          onChange={(e) => setClase(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Temas (separados por comas)"
          value={temas.join(", ")}
          onChange={(e) =>
            setTemas(e.target.value.split(",").map((str) => str.trim()))
          }
          style={styles.input}
        />
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={examen}
            onChange={(e) => setExamen(e.target.checked)}
          />
          <label>Es un examen</label>
        </div>
        <input
          type="number"
          placeholder="Comunidad (Opcional)"
          value={comunidad}
          onChange={(e) => setComunidad(Number(e.target.value))}
          style={styles.input}
        />
        <Button
          label={createPostMutation.isPending ? "Publicando..." : "Publicar"}
          variant="primary"
          disabled={createPostMutation.isPending}
        />
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    maxWidth: 400,
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
};

export default CreatePost;

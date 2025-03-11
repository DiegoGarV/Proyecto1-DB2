import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [cursosLlevados, setCursosLlevados] = useState<string[]>([]);
  const [cursosActuales, setCursosActuales] = useState<string[]>([]);
  const [beca, setBeca] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const payload = {
        correo: email,
        nombre_usuario: nombreUsuario,
        contraseña: password,
        cursos_llevados: cursosLlevados,
        cursos_actuales: cursosActuales,
        beca,
      };

      console.log("Enviando datos:", payload);

      const response = await axios.post(`${API_URL}/create_user`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("user_id", response.data.usuario.id);
      navigate("/home");
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error al registrar usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Crear Usuario</h2>
      <input
        type="text"
        placeholder="Nombre de Usuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cursos Llevados (separados por comas)"
        onChange={(e) => setCursosLlevados(e.target.value.split(","))}
      />
      <input
        type="text"
        placeholder="Cursos Actuales (separados por comas)"
        onChange={(e) => setCursosActuales(e.target.value.split(","))}
      />
      <label>
        <input
          type="checkbox"
          checked={beca}
          onChange={(e) => setBeca(e.target.checked)}
        />
        ¿Tienes beca?
      </label>
      <button onClick={handleRegister}>Registrar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default RegisterScreen;

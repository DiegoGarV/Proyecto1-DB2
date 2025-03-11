import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDisplay from "../molecules/UserDisplay";

const LOGGED_IN_USER_ID = 40745258; // ID del usuario autenticado

interface User {
  id: number;
  nombre: string;
}

interface UserListProps {
  type: "followers" | "following"; // Indica qué lista mostrar
}

const UserList: React.FC<UserListProps> = ({ type }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const endpoint =
      type === "followers"
        ? `/getFollowers/${LOGGED_IN_USER_ID}`
        : `/getFollowed/${LOGGED_IN_USER_ID}`;

    axios
      .get(`http://127.0.0.1:8000${endpoint}`)
      .then((response) => {
        setUsers(response.data.followers || response.data.followed || []);
      })
      .catch((error) => console.error(`Error fetching ${type}:`, error))
      .finally(() => setIsLoading(false));
  }, [type]);

  if (isLoading) return <p>Cargando {type}...</p>;
  if (users.length === 0) return <p>No hay {type} aún.</p>;

  return (
    <div style={styles.userList}>
      {users.map((user) => (
        <UserDisplay key={user.id} userId={user.id} userName={user.nombre} />
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  userList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    width: "100%",
    overflowY: "auto",
    maxHeight: 300, // Para que no sea muy largo
  },
};

export default UserList;

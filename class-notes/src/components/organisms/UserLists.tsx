import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserDisplay from "../molecules/UserDisplay";

const LOGGED_IN_USER_ID = 40745258;

interface UserListProps {
  type: "followers" | "following"; // Indica qué lista mostrar
}

const fetchUsers = async (type: "followers" | "following") => {
  const endpoint =
    type === "followers"
      ? `/getFollowers/${LOGGED_IN_USER_ID}`
      : `/getFollowed/${LOGGED_IN_USER_ID}`;

  const { data } = await axios.get(`http://127.0.0.1:8000${endpoint}`);
  return data.followers || data.followed || [];
};

const UserList: React.FC<UserListProps> = ({ type }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [type, LOGGED_IN_USER_ID],
    queryFn: () => fetchUsers(type),
  });

  if (isLoading) return <p>Cargando {type}...</p>;
  if (error) return <p>Error cargando {type}.</p>;
  if (!users || users.length === 0) return <p>No hay {type} aún.</p>;

  return (
    <div style={styles.userList}>
      {users.map((user: any) => (
        <UserDisplay key={user.id} userId={user.id} userName={user.name} />
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

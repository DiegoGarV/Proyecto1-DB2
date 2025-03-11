import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserDisplay from "../molecules/UserDisplay";

interface UserListProps {
  type: "followers" | "following";
}

const getUserId = () => localStorage.getItem("user_id") || "";

const fetchUsers = async (type: "followers" | "following", userId: string) => {
  if (!userId) throw new Error("No hay usuario autenticado.");

  const endpoint =
    type === "followers" ? `/getFollowers/${userId}` : `/getFollowed/${userId}`;

  const { data } = await axios.get(`http://127.0.0.1:8000${endpoint}`);
  return data.followers || data.followed || [];
};

const UserList: React.FC<UserListProps> = ({ type }) => {
  const userId = getUserId();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: [type, userId],
    queryFn: () => fetchUsers(type, userId),
    enabled: !!userId,
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

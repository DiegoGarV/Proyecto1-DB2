import { useState } from "react";
import userImg from "../../assets/usuario/DefaultUser.png";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import {
  useFollowedUsers,
  useFollowUser,
  useUnfollowUser,
} from "../../services/api";

interface UserDisplayProps {
  userId?: number;
  userName: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ userName, userId }) => {
  const [showOptions, setShowOptions] = useState(false);

  // Obtener usuarios seguidos
  const { data: followedUsers } = useFollowedUsers();

  // Mutaciones
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  // Determinar si el usuario ya sigue al otro usuario
  const isFollowing = followedUsers?.some((user: any) => user.id === userId);

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <Avatar src={userImg} size={40} />
        <div>{userName}</div>
      </div>
      <div style={styles.rightSide}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          style={styles.optionDots}
        >
          ⋮
        </button>

        {showOptions && (
          <div style={styles.dropdownMenu}>
            <Button
              label={isFollowing ? "Dejar de seguir" : "Seguir"}
              variant="secondary"
              onClick={() =>
                isFollowing
                  ? unfollowMutation.mutate(userId!)
                  : followMutation.mutate(userId!)
              }
              disabled={followMutation.isPending || unfollowMutation.isPending}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#009688",
    position: "relative",
    alignSelf: "center",
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  optionDots: {
    background: "none",
    border: "none",
    fontSize: 20,
    cursor: "pointer",
    color: "white",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "white",
    borderRadius: 5,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    padding: 5,
    zIndex: 9999,
  },
};

export default UserDisplay;

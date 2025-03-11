import { useEffect, useState } from "react";
import userImg from "../../assets/usuario/DefaultUser.png";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import axios from "axios";

const LOGGED_IN_USER_ID = 40745258;

interface UserDisplayProps {
  userId?: number;
  userName: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  userName = "Desconocido",
  userId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/getFollowed/${LOGGED_IN_USER_ID}`)
      .then((response) => {
        const followedUsers = response.data.followed || [];
        setIsFollowing(followedUsers.some((user: any) => user.id === userId));
      })
      .catch((error) => console.error("Error fetching followed users:", error));
  }, [userId]);

  const toggleFollow = () => {
    if (isFollowing) {
      axios
        .delete(`http://127.0.0.1:8000/delete_follow`, {
          data: { user_id: LOGGED_IN_USER_ID, followed_id: userId },
        })
        .then(() => setIsFollowing(false))
        .catch((error) => console.error("Error al dejar de seguir:", error));
    } else {
      axios
        .post(`http://127.0.0.1:8000/follow_user`, {
          user_id: LOGGED_IN_USER_ID,
          followed_id: userId,
        })
        .then(() => setIsFollowing(true))
        .catch((error) => console.error("Error al seguir:", error));
    }
    setShowOptions(false);
  };
  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div>
          <Avatar src={userImg} size={40} />
        </div>
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
              onClick={toggleFollow}
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
  userName: {
    fontSize: 16,
    color: "white",
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

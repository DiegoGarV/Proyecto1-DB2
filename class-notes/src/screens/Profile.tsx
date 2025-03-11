import React, { useState } from "react";
import Avatar from "../components/atoms/Avatar";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import UserList from "../components/organisms/UserLists";
import avatarImg from "../assets/usuario/DefaultUser.png";
import DropDown from "../components/molecules/DropDown";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../services/api";

const Profile: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useLoggedInUser();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.userCont1}>
          <div style={styles.userBtn} onClick={() => navigate("/profile")}>
            <div style={styles.userImg}>
              <Avatar src={avatarImg} size={50} />
            </div>
            <div style={styles.userName}>
              {isLoading ? "Cargando..." : error ? "Error" : user?.name}
            </div>
          </div>
        </div>
        <div style={styles.title}>Profile</div>
        <div style={styles.optionsCont}>
          <div
            style={styles.optionsButton}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Options ▼
          </div>
          {dropdownOpen && <DropDown />}
        </div>
      </div>
      <div style={styles.userCont}>
        <div>
          <Avatar src={avatarImg} size={100} />
        </div>
        <Text size="large" className="mt-3">
          UserName: {isLoading ? "Cargando..." : error ? "Error" : user?.name}
        </Text>
        <Text color="gray" className="text-center mt-2">
          Correo electronico: {user?.correo}
        </Text>
        <Text color="gray" className="text-center mt-2">
          Cursos Actuales: {user?.cursos_actuales}
        </Text>
        <Text color="gray" className="text-center mt-2">
          Cursos Llevados: {user?.cursos_llevados}
        </Text>
        <Text color="gray" className="text-center mt-2">
          Beca : {user?.beca ? "Si tengo!" : "No tengo"}
        </Text>
        <Button label="Editar Perfil" variant="primary" />
      </div>
      <div style={styles.follows}>
        <div style={styles.follColumn}>
          <div style={styles.follTitle}>Followers</div>
          <UserList type="followers" />
        </div>
        <div style={{ ...styles.follColumn, backgroundColor: "lightcoral" }}>
          <div style={styles.follTitle}>Following</div>
          <UserList type="following" />
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    justifySelf: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  header: {
    display: "flex",
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#009688",
  },
  userCont: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    justifyItems: "center",
    justifySelf: "center",
    backgroundColor: "#009688",
    padding: 20,
    borderRadius: "10px",
  },
  userCont1: {
    display: "flex",
    width: "33%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    gap: 10,
  },
  follows: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  follColumn: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: 20,
    width: "50%",
    minHeight: 200,
    backgroundColor: "lightblue",
  },
  follTitle: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
    border: "2px solid black",
    borderRadius: 10,
    padding: 10,
  },
  userBtn: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    padding: "8px 12px",
    backgroundColor: "#00796B",
    color: "white",
    borderRadius: "5px",
    userSelect: "none",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    display: "flex",
    width: "33%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    fontSize: 30,
  },
  optionsCont: {
    display: "flex",
    width: "33%",
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  optionsButton: {
    cursor: "pointer",
    padding: "8px 12px",
    backgroundColor: "#00796B",
    color: "white",
    borderRadius: "5px",
    userSelect: "none",
  },
};

export default Profile;

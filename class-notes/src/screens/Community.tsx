import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/atoms/Avatar";
import Button from "../components/atoms/Button";
import userImg from "../assets/usuario/DefaultUser.png";
import DropDown from "../components/molecules/DropDown";
import CommunityList from "../components/organisms/CommunityList";
import { useCommunities } from "../services/api";

const Communities: React.FC = () => {
  const { data, isLoading, error } = useCommunities();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const displayedCommunities = data
    ? [...data].sort(() => 0.5 - Math.random()).slice(0, 10)
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.userCont}>
          <div style={styles.userBtn} onClick={() => navigate("/profile")}>
            <div style={styles.userImg}>
              <Avatar src={userImg} size={50} />
            </div>
            <div style={styles.userName}>Usuario</div>
          </div>
        </div>
        <div style={styles.title}>Comunidades</div>
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
      <div style={styles.buttonContainer}>
        <Button
          label="Nueva Comunidad"
          variant="primary"
          onClick={() => navigate("/create-community")}
        />
      </div>
      <div style={styles.communityCont}>
        <CommunityList
          data={displayedCommunities}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#009688",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#009688",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  communityCont: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  userCont: {
    display: "flex",
    width: "33%",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    gap: 10,
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

export default Communities;

import { useNavigate } from "react-router-dom";

interface DropDownProps {
  mainRoute?: string;
}

const DropDown: React.FC<DropDownProps> = ({ mainRoute = "/home" }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.dropdownMenu}>
      <div style={styles.dropdownItem} onClick={() => navigate("/saved-posts")}>
        Saved Posts
      </div>
      <div style={styles.dropdownItem} onClick={() => navigate("/communities")}>
        Comunidades
      </div>
      <div style={styles.dropdownItem} onClick={() => navigate("/home")}>
        Home
      </div>
    </div>
  );
};
const styles: Record<string, React.CSSProperties> = {
  ropdownMenu: {
    top: "100%",
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  dropdownItemHover: {
    backgroundColor: "#f0f0f0",
  },
};

export default DropDown;

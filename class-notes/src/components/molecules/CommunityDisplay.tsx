import { useState } from "react";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";
import {
  useJoinedCommunities,
  useJoinCommunity,
  useLeaveCommunity,
  useReportCommunity,
} from "../../services/api";

interface CommunityDisplayProps {
  communityId: number;
  communityName: string;
}

const CommunityDisplay: React.FC<CommunityDisplayProps> = ({
  communityId,
  communityName,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  // Obtener comunidades a las que pertenece el usuario
  const { data: joinedCommunities } = useJoinedCommunities();

  // Mutaciones para unirse, salir o reportar
  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();
  const reportMutation = useReportCommunity();

  // Verificar si el usuario ya pertenece a la comunidad
  const isMember = joinedCommunities?.some(
    (community: any) => community.id === communityId
  );

  const toggleJoinLeave = () => {
    if (isMember) {
      leaveMutation.mutate(communityId);
    } else {
      joinMutation.mutate(communityId);
    }
  };

  const handleReport = () => {
    reportMutation.mutate(communityId);
    setShowOptions(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <Avatar
          src={`https://picsum.photos/seed/${communityId}/40`} // Imagen aleatoria
          size={40}
        />
        <div style={{ color: "white" }}>{communityName}</div>
      </div>
      <div style={styles.rightSide}>
        <Button
          label={isMember ? "Abandonar" : "Seguir"}
          variant="secondary"
          onClick={toggleJoinLeave}
          disabled={joinMutation.isPending || leaveMutation.isPending}
        />
        <button
          onClick={() => setShowOptions(!showOptions)}
          style={styles.optionDots}
        >
          ⋮
        </button>

        {showOptions && (
          <div style={styles.dropdownMenu}>
            <button onClick={handleReport} style={styles.menuButton}>
              Reportar Comunidad
            </button>
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
    backgroundColor: "#00796B",
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
  menuButton: {
    background: "none",
    border: "none",
    padding: 5,
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
};

export default CommunityDisplay;

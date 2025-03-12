import React from "react";
import CommunityDisplay from "../molecules/CommunityDisplay";

interface CommunityListProps {
  data?: any[];
  isLoading: boolean;
  error: any;
}

const CommunityList: React.FC<CommunityListProps> = ({
  data,
  isLoading,
  error,
}) => {
  if (isLoading) return <p>Cargando comunidades...</p>;
  if (error) return <p>Error al cargar comunidades.</p>;
  if (!data || data.length === 0) return <p>No hay comunidades disponibles.</p>;

  console.warn(data);

  return (
    <div style={styles.listContainer}>
      {data.map((community) => (
        <CommunityDisplay
          key={community.id}
          communityId={community.id}
          communityName={community.id}
        />
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
    width: "100%",
    padding: 20,
  },
};

export default CommunityList;

interface PostArchiveProps {
  archArr: string;
}

const PostArchives: React.FC<PostArchiveProps> = ({ archArr }) => {
  const archivosArray =
    typeof archArr === "string"
      ? JSON.parse(archArr.replace(/'/g, '"'))
      : archArr;

  return (
    <div style={styles.archiveCont}>
      {Array.isArray(archivosArray) ? (
        archivosArray.map((archivo: string, index: number) => (
          <div key={index} style={styles.archive}>
            <div style={styles.archiveText}>{`📑  ${archivo}  `}</div>
          </div>
        ))
      ) : (
        <p>No hay archivos disponibles</p>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  archiveCont: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  archive: {
    display: "flex",
    flexShrink: 1,
    borderRadius: 15,
    border: "1px solid black",
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "left",
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    padding: 1,
    paddingRight: 5,
    paddingLeft: 5,
    cursor: "pointer",
  },
};

export default PostArchives;

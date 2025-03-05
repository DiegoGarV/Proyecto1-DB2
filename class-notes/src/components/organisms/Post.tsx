import React from "react";
import PostHeader from "../molecules/PostHeader";
import PostActions from "../molecules/PostActions";

const Post: React.FC<any> = ({
  username,
  avatar,
  date,
  content,
  archivos,
  title,
  calificacion,
}) => {
  console.warn(archivos);
  const archivosArray =
    typeof archivos === "string"
      ? JSON.parse(archivos.replace(/'/g, '"'))
      : archivos;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <PostHeader username={username} avatar={avatar} date={date} />
      </div>
      <div style={styles.content}>
        <h4 style={{ textAlign: "left", width: "90%" }}>{title}</h4>
        <p className="mt-2" style={{ width: "90%" }}>
          {content}
        </p>
        <div className="archiveCont" style={styles.archiveCont}>
          {Array.isArray(archivosArray) ? (
            archivosArray.map((archivo: string, index: number) => (
              <div key={index} style={styles.archive}>
                <text style={styles.archiveText}>{`📑  ${archivo}  `}</text>
              </div>
            ))
          ) : (
            <p>No hay archivos disponibles</p>
          )}
        </div>
      </div>
      <div style={styles.postActions}>
        <PostActions calificacion={calificacion} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "30%",
    flexDirection: "column",
    backgroundColor: "#212121",
    borderWidth: 5,
    borderColor: "#00796B",
    padding: 2,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    width: "100%",
    height: "15%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#00796B",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    flexDirection: "column",
  },
  postActions: {
    display: "flex",
    width: "100%",
    backgroundColor: "#F5F5F5",
    height: "30%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  archiveCont: {
    display: "flex",
    width: "90%",
    justifyContent: "space-around",
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  archive: {
    display: "flex",
    flexShrink: 1,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: "black",
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "left",
    flexDirection: "row",
    overflow: "hidden",
    flexWrap: "wrap",
    padding: 1,
    marginTop: 5,
    marginBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    cursor: "pointer",
  },
  archiveText: {
    display: "flex",
    textOverflow: "ellipsis",
    alignSelf: "center",
    justifyContent: "center",
    justifySelf: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
};

export default Post;

interface CloseBtnProps {
  onPress: () => void;
  size?: number;
}

const CloseBtn: React.FC<CloseBtnProps> = ({ onPress, size }) => {
  return (
    <div style={{ ...styles.container, width: size, height: size }}>
      <button style={styles.pressable} onClick={onPress}></button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    backgroundColor: "red",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  pressable: {
    color: "red",
    fontSize: 25,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
};

export default CloseBtn;

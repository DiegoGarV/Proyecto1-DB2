import React, { useState } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  padding?: string;
  disabled?: boolean;
}

const Styles: Record<string, React.CSSProperties> = {
  base: {
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    display: "inline-block",
  },
  primary: {
    backgroundColor: "#007bff",
    color: "white",
    border: "2px solid #0056b3",
  },
  secondary: {
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "2px solid #b0b0b0",
  },
  danger: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "2px solid #a71d2a",
  },
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  padding = "12px 24px",
  disabled = false,
}) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const onPress = () => {
    if (pressed) {
      setPressed(false);
    } else {
      setPressed(true);
    }

    if (onClick) {
      onClick();
    }
  };
  return (
    <motion.button
      style={{
        ...Styles.base,
        ...Styles[pressed ? "primary" : variant],
        padding: padding,
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onClick={onPress}
      disabled={disabled}
    >
      {label}
    </motion.button>
  );
};

export default Button;

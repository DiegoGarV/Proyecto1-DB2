import React from "react";

interface TextProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  color?: "black" | "gray" | "blue";
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  size = "medium",
  color = "black",
  className,
}) => {
  const textSize = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg font-bold",
  };

  const textColor = {
    black: "text-black",
    gray: "text-gray-500",
    blue: "text-blue-500",
  };

  return (
    <p className={`${textSize[size]} ${textColor[color]} ${className}`}>
      {children}
    </p>
  );
};

export default Text;

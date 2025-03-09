import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = 40,
}) => (
  <img
    className="w-10 h-10 rounded-full"
    src={src}
    alt={alt}
    height={size}
    width={size}
    style={{ backgroundColor: "transparent" }}
  />
);

export default Avatar;

import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar" }) => (
  <img
    className="w-10 h-10 rounded-full"
    src={src}
    alt={alt}
    height={40}
    width={40}
    style={{ backgroundColor: "transparent" }}
  />
);

export default Avatar;

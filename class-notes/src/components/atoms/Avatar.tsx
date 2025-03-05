import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "User Avatar" }) => (
  <img className="w-10 h-10 rounded-full" src={src} alt={alt} />
);

export default Avatar;

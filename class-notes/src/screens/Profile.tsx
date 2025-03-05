import React from "react";
import Avatar from "../components/atoms/Avatar";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";

const Profile: React.FC = () => {
  const user = {
    name: "John Doe",
    bio: "Desarrollador Full Stack | Amante de la tecnología 🚀",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div>
        <div>
          <Avatar src={user.avatar} />
        </div>
        <Text size="large" className="mt-3">
          {user.name}
        </Text>
        <Text color="gray" className="text-center mt-2">
          {user.bio}
        </Text>
        <Button label="Editar Perfil" variant="primary" />
      </div>
    </div>
  );
};

export default Profile;

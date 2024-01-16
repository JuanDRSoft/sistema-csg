import React from "react";

const CardUser = ({ user }) => {
  const { username, rol } = user;

  return (
    <div className="bg-gray-100 p-2 flex justify-between rounded-lg">
      <h1 className="text-sm font-medium">{username}</h1>
      <h1 className="text-sm">{rol}</h1>
    </div>
  );
};

export default CardUser;

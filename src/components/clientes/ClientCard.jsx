import React from "react";
import { Link } from "react-router-dom";

const ClientCard = ({ client }) => {
  const { id, name, razonSocial, ruc, serviceType } = client;

  const getType = (e) => {
    switch (e) {
      case "AESA":
        return "Poliza";
      case "PART":
        return "Vigencia";
    }
  };

  return (
    <Link
      to={`${id}`}
      className="bg-white p-5 flex mb-3 rounded-xl shadow items-center cursor-pointer hover:bg-gray-100"
    >
      <h1 className="w-full font-semibold">{name}</h1>
      <h1 className="w-full text-center">{razonSocial}</h1>
      <h1 className="w-full text-center">{ruc}</h1>
      <h1 className="w-full text-center">{getType(serviceType)}</h1>
    </Link>
  );
};

export default ClientCard;

import React from "react";
import { Link } from "react-router-dom";

const InventarioCard = ({ producto }) => {
  return (
    <Link to={`${producto.id}`} className="p-5 bg-white rounded-xl flex">
      <p className="w-full">{producto.name}</p>
      <p className="w-full text-center">{producto.name}</p>
      <p className="w-full text-center">
        {producto.equipos?.length + producto.sim?.length}
      </p>
    </Link>
  );
};

export default InventarioCard;

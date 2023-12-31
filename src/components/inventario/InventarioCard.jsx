import React from "react";

const InventarioCard = ({ producto }) => {
  return (
    <div className="p-5 bg-white rounded-xl flex">
      <p className="w-full">{producto.name}</p>
      <p className="w-full text-center">{producto.name}</p>
      <p className="w-full text-center">
        {producto.equipos.length + producto.sim.length}
      </p>
    </div>
  );
};

export default InventarioCard;

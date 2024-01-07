import React from "react";
import useClient from "../hooks/useClient";
import InventarioCard from "../components/inventario/InventarioCard";
import { Link } from "react-router-dom";

const Inventario = () => {
  const { inventory } = useClient();

  return (
    <div>
      <h1 className="font-bold text-3xl">Inventario</h1>

      <div className="flex justify-end mt-5">
        <Link
          to="new"
          className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-xl text-white font-medium"
        >
          <i class="fas fa-plus"></i> Crear Producto
        </Link>
      </div>

      <div className="flex rounded-xl mt-10 mb-4 bg-gradient-to-r from-pink-500 p-2 px-5 to-orange-300 font-medium text-white">
        <p className="w-full">Producto</p>
        <p className="w-full text-center">Descripción</p>
        <p className="w-full text-center">Unidades</p>
      </div>

      <div>
        {inventory.map((e) => (
          <InventarioCard producto={e} />
        ))}
      </div>
    </div>
  );
};

export default Inventario;

import React from "react";
import useClient from "../hooks/useClient";
import { Link } from "react-router-dom";

const Contratos = () => {
  const { contratos } = useClient();

  return (
    <div>
      <h1 className="font-bold text-3xl">Contratos</h1>

      <div className="flex justify-end">
        <Link
          to="new"
          className="bg-gradient-to-r from-blue-500 to-cyan-400 font-medium text-white p-2 rounded-xl"
        >
          <i class="fas fa-plus"></i> Crear Contrato
        </Link>
      </div>

      <div className="flex py-2 px-5 bg-gradient-to-r from-pink-500 to-orange-300 mt-10 rounded-xl font-medium text-white">
        <h1 className="w-full">Cliente</h1>
        <h1 className="w-full text-center">Tiempo</h1>
        <h1 className="w-full text-center">Estado</h1>
      </div>

      <div className="mt-5"></div>
    </div>
  );
};

export default Contratos;

import React from "react";
import NewClient from "../components/clientes/NewClient";
import useClient from "../hooks/useClient";
import ClientCard from "../components/clientes/ClientCard";

const Clientes = () => {
  const { clients } = useClient();

  return (
    <div>
      <h1 className="font-bold text-3xl">Clientes</h1>

      <div className="mt-5">
        <div className="flex justify-end">
          <NewClient />
        </div>

        <div className="flex px-5 w-full text-white rounded-xl py-2 mt-10 font-semibold bg-gradient-to-r  from-blue-500 to-cyan-400">
          <h1 className="w-full">Nombre</h1>
          <h1 className="w-full text-center">Razón Social</h1>
          <h1 className="w-full text-center">RUC</h1>
          <h1 className="w-full text-center">Servicio </h1>
        </div>

        <div className="mt-5">
          {clients.map((e) => (
            <ClientCard client={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clientes;

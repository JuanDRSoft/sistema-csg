import React from "react";
import NewClient from "../components/clientes/NewClient";

const Clientes = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Clientes</h1>

      <div className="mt-5">
        <div className="flex justify-end">
          <NewClient />
        </div>
      </div>
    </div>
  );
};

export default Clientes;

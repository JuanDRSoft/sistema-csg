import React, { useEffect, useState } from "react";
import NewClient from "../components/clientes/NewClient";
import useClient from "../hooks/useClient";
import ClientCard from "../components/clientes/ClientCard";

const Clientes = () => {
  const { clients } = useClient();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search !== "") {
      const filter = clients.filter((e) =>
        e.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            search
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      );

      setData(filter);
    } else {
      setData(clients);
    }
  }, [clients, search]);

  return (
    <div>
      <h1 className="font-bold text-3xl">Clientes</h1>

      <div className="mt-5">
        <div className="flex justify-between">
          <div>
            <input
              className="rounded-xl p-1 pl-3"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <NewClient />
        </div>

        <div className="flex px-5 w-full text-white rounded-xl py-2 mt-10 font-semibold bg-gradient-to-r  from-blue-500 to-cyan-400">
          <h1 className="w-full">Nombre</h1>
          <h1 className="w-full text-center">Razón Social</h1>
          <h1 className="w-full text-center">RUC</h1>
          <h1 className="w-full text-center">Servicio </h1>
        </div>

        <div className="mt-5">
          {data.map((e) => (
            <ClientCard client={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clientes;

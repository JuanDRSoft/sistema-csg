import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const [tab, setTab] = useState(1);

  const { events } = useAuth();

  return (
    <div>
      <h1 className="font-bold text-3xl">Eventos</h1>

      <div className="mt-10 flex gap-5">
        <button
          onClick={() => setTab(1)}
          className={`border-b-2 ${
            tab == 1 && "border-pink-600"
          } p-2 font-semibold`}
        >
          Activos
        </button>
        <button
          onClick={() => setTab(2)}
          className={`border-b-2 ${
            tab == 2 && "border-pink-600"
          } p-2 font-semibold`}
        >
          Procesados
        </button>
      </div>

      <div className="mt-10">
        <div className="flex rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-orange-300 mb-3 py-2 px-5">
          <p className="w-full">Nombre</p>
          <p className="w-full text-center">Tipo</p>
          <p className="w-full text-end">Creado</p>
        </div>

        {tab == 1 &&
          events
            .filter((e) => !e.status || e.status == "Unprocessed")
            .map((e) => (
              <Link
                to={`/app/events/${e.id}`}
                className="bg-white p-5 mb-3 flex items-center gap-5 rounded-xl shadow"
              >
                <p className="w-full">{e.device.name}</p>
                <p className="w-full text-center">{e.type}</p>
                <p className="w-full text-end">{e.device.created_at}</p>
              </Link>
            ))}

        {tab == 2 &&
          events
            .filter((e) => e.status == "Processed")
            .map((e) => (
              <Link
                to={`/app/events/${e.id}`}
                className="bg-white p-5 mb-3 flex items-center gap-5 rounded-xl shadow"
              >
                <p className="w-full">{e.device.name}</p>
                <p className="w-full text-center">{e.type}</p>
                <p className="w-full text-end">{e.device.created_at}</p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;

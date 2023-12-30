import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const { events } = useAuth();

  return (
    <div>
      <h1 className="font-bold text-3xl">Eventos</h1>

      <div className="mt-10 flex gap-5">
        <button className="border-b-2 border-pink-600 p-2 font-semibold">
          Activos
        </button>
        <button className="border-b-2 border-pink-600 p-2 font-semibold">
          Procesados
        </button>
      </div>

      <div className="mt-10">
        <div className="flex rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-orange-300 mb-3 py-2 px-5">
          <p className="w-full">Nombre</p>
          <p className="w-full text-center">Tipo</p>
          <p className="w-full text-end">Creado</p>
        </div>

        {events.map((e) => (
          <Link
            to={`/app/events/${e.id}`}
            className="bg-white p-5 mb-3 flex gap-5 rounded-xl shadow"
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

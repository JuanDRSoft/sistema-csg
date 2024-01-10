import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const [tab, setTab] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const { events } = useAuth();

  useEffect(() => {
    if (tab == 1) {
      const filter = events.filter((e) => {
        const fechaActual = new Date();
        const fechaCreacion = new Date(e.time);
        const esFechaDeHoy =
          fechaCreacion.getDate() === fechaActual.getDate() &&
          fechaCreacion.getMonth() === fechaActual.getMonth() &&
          fechaCreacion.getFullYear() === fechaActual.getFullYear();

        return esFechaDeHoy && (e.status == "Unprocessed" || e.status == null);
      });

      setData(filter);
    } else if (tab == 2) {
      const filter = events.filter((e) => e.status == "Processed");

      setData(filter);
    } else if (tab == 3) {
      const filter = events.filter((e) => {
        const fechaActual = new Date();
        const fechaCreacion = new Date(e.time);
        const diferenciaTiempo = fechaActual - fechaCreacion;
        const diferenciaHoras = diferenciaTiempo / (1000 * 60 * 60);
        return (
          diferenciaHoras > 24 &&
          (e.status == "Unprocessed" || e.status == null)
        );
      });

      setData(filter);
    }
  }, [events, tab]);

  useEffect(() => {
    if (search !== "") {
      const filter = events.filter((e) =>
        e.device.name
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
    }
  }, [search]);

  return (
    <div>
      <h1 className="font-bold text-3xl">Eventos</h1>

      <div className="mt-10 flex gap-5 items-center">
        <div className="flex gap-5 flex-1">
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
          <button
            onClick={() => setTab(3)}
            className={`border-b-2 ${
              tab == 3 && "border-pink-600"
            } p-2 font-semibold`}
          >
            Pendientes
          </button>
        </div>

        <div className="relative">
          <input
            className="rounded-xl p-1 pl-3"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i class="fas fa-search absolute top-2 right-2 text-gray-200"></i>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-orange-300 mb-3 py-2 px-5">
          <p className="w-full">Nombre</p>
          <p className="w-full text-center">Tipo</p>
          <p className="w-full text-end">Creado</p>
        </div>

        {events.length > 0 ? (
          data.map((e) => (
            <Link
              to={`/app/events/${e.id}`}
              className="bg-white p-5 mb-3 flex items-center gap-5 rounded-xl shadow"
            >
              <p className="w-full">{e.device.name}</p>
              <p className="w-full text-center">{e.type}</p>
              <p className="w-full text-end">{e.time}</p>
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center h-full pt-20">
            <i class="fas fa-circle-notch text-9xl text-white animate-spin"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

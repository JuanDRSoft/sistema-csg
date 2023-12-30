import React, { useState } from "react";
import { Link } from "react-router-dom";
import Asistencia from "../components/servicios/Asistencia";
import Modificaciones from "../components/servicios/Modificaciones";

const Servicios = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMod, setIsOpenMod] = useState(false);

  return (
    <div>
      <h1 className="font-bold text-3xl">Servicios</h1>

      <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        <Link
          to="/app/clientes?type=new-install"
          className="bg-white p-5 cursor-pointer hover:bg-gray-200 duration-200 text-center shadow rounded-xl py-10 grid items-center"
        >
          <i class="far fa-plus-square text-5xl text-blue-500"></i>
          <h1 className="text-4xl font-bold">Nueva Instalación</h1>
        </Link>

        <div
          onClick={() => setIsOpen(true)}
          className="bg-white p-5 cursor-pointer hover:bg-gray-200 duration-200 text-center shadow rounded-xl py-10 grid items-center"
        >
          <i class="fas fa-hands-helping text-5xl text-blue-500"></i>
          <h1 className="text-4xl font-bold">Asistencia</h1>
        </div>

        <div className="bg-white p-5 cursor-pointer hover:bg-gray-200 duration-200 text-center shadow rounded-xl py-10 grid items-center">
          <i class="fas fa-puzzle-piece text-5xl text-blue-500"></i>
          <h1 className="text-4xl font-bold">Instalación Adicional</h1>
        </div>

        <div
          onClick={() => setIsOpenMod(true)}
          className="bg-white p-5 cursor-pointer hover:bg-gray-200 duration-200 text-center shadow rounded-xl py-10 grid items-center"
        >
          <i class="fas fa-tools text-5xl text-blue-500"></i>
          <h1 className="text-4xl font-bold">Modificaciones</h1>
        </div>
      </div>

      <Asistencia isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <Modificaciones
        isOpen={isOpenMod}
        closeModal={() => setIsOpenMod(false)}
      />
    </div>
  );
};

export default Servicios;

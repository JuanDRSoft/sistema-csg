import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "/logo.svg";
import Profile from "/profile-placeholder.jpg";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { cerrarSesionAuth } = useAuth();

  const openMenu = () => {
    document.getElementById("menu").classList.toggle("-translate-x-[350px]");
    document.getElementById("back").classList.toggle("-translate-x-[100%]");
  };

  return (
    <div>
      <div
        id="menu"
        className="fixed w-[300px] bg-gray-950 h-screen z-10 shadow-xl md:translate-x-0 -translate-x-[350px] duration-300"
      >
        <div className="flex items-center gap-2 justify-center mt-10 relative">
          <img src={Logo} className="w-9" />
          <h1 className="text-white font-semibold text-3xl">Dashboard</h1>
          <i
            class="fas fa-arrow-circle-left absolute md:hidden text-white -right-4 text-4xl -top-5"
            onClick={openMenu}
          ></i>
        </div>

        <div className="text-white mt-10">
          <ul>
            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gradient-to-r font-semibold  from-pink-500 to-orange-300">
              <Link
                to="/app"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-inbox"></i>Eventos
              </Link>
            </li>

            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <Link
                to="clientes"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-users"></i>Clientes
              </Link>
            </li>

            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <Link
                to="servicios"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-network-wired"></i>Servicios
              </Link>
            </li>

            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <Link
                to="contratos"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-file-signature"></i>Contratos
              </Link>
            </li>

            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <Link
                to="inventario"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-warehouse"></i> Inventario
              </Link>
            </li>

            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <Link
                to="inspeccion"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-search-plus"></i> Inspección
              </Link>
            </li>
          </ul>
        </div>

        <hr className="mt-20 mb-6 border-none h-0.5 bg-gray-800" />

        <div className="text-white">
          <ul>
            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <Link
                to="ajustes"
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-sliders-h"></i> Ajustes
              </Link>
            </li>

            <li className="mt-4 px-10 p-3 duration-300 cursor-pointer hover:bg-gray-700 font-semibold">
              <button
                onClick={cerrarSesionAuth}
                className="w-full flex items-center gap-3 text-lg"
              >
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="back"
        className="absolute w-screen bg-black/50 h-screen z-[2] md:hidden -translate-x-[100%] duration-300"
        onClick={openMenu}
      ></div>

      <div className="fixed top-0 bg-gray-500 w-full p-3 flex justify-between shadow-lg items-center">
        <div
          onClick={openMenu}
          className="w-10 rounded-xl h-10 flex items-center justify-center bg-gray-200 cursor-pointer"
        >
          <i class="fas fa-bars"></i>
        </div>

        <div className="flex gap-3 items-center">
          <p className="font-bold text-white">Usuario</p>

          <div className="overflow-hidden w-10 h-10 rounded-full">
            <img src={Profile} />
          </div>
        </div>
      </div>

      <div className="md:pl-[330px] pl-5 pt-20 w-full md:pr-10 pr-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

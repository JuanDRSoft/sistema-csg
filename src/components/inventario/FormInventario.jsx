import React, { useState } from "react";
import useClient from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";
import Back from "../../utils/Back";

const FormInventario = () => {
  const [product, setProduct] = useState({
    name: "",
    descripcion: "",
    equipos: [],
    sim: [],
  });
  const [equipo, setEquipo] = useState({
    marca: "",
    modelo: "",
    imei: "",
  });
  const [sim, setSim] = useState({
    telefonia: "",
    numero: "",
  });
  const { createProduct } = useClient();

  const navigate = useNavigate();

  const addEquipo = () => {
    setProduct({ ...product, equipos: [...product.equipos, equipo] });
  };

  const addSim = () => {
    setProduct({ ...product, sim: [...product.sim, sim] });
  };

  const initial = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">
        <Back /> Nuevo Producto
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-5 rounded-xl shadow">
          <label className="font-medium">Nombre</label>
          <input
            className="w-full mt-2 mb-3 border rounded p-1"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          <label className="font-medium">Descrpción</label>
          <textarea
            className="w-full mt-2 mb-3 border rounded p-1"
            value={product.descripcion}
            onChange={(e) =>
              setProduct({ ...product, descripcion: e.target.value })
            }
          />
        </div>

        <div className="p-5 bg-white rounded-xl">
          <h1 className="font-medium mb-5">Equipos</h1>

          <label className="font-medium">Marca</label>
          <input
            className="w-full mt-2 mb-3 border rounded p-1"
            value={equipo.marca}
            onChange={(e) => setEquipo({ ...equipo, marca: e.target.value })}
          />

          <label className="font-medium">Modelo</label>
          <input
            className="w-full mt-2 mb-3 border rounded p-1"
            value={equipo.modelo}
            onChange={(e) => setEquipo({ ...equipo, modelo: e.target.value })}
          />

          <label className="font-medium">Imei</label>
          <input
            className="w-full mt-2 mb-3 border rounded p-1"
            value={equipo.imei}
            onChange={(e) => setEquipo({ ...equipo, imei: e.target.value })}
          />

          <button
            onClick={addEquipo}
            className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 font-medium text-white w-full rounded p-1"
          >
            Añadir equipo
          </button>
        </div>

        <div className="p-5 bg-white rounded-xl">
          <h1 className="font-medium mb-5">SIM CARD</h1>

          <label className="font-medium">Telefonia </label>
          <input
            className="w-full mt-2 mb-3 border rounded p-1"
            value={sim.telefonia}
            onChange={(e) => setSim({ ...sim, telefonia: e.target.value })}
          />

          <label className="font-medium">Número</label>
          <input
            className="w-full mt-2 mb-3 border rounded p-1"
            value={sim.numero}
            onChange={(e) => setSim({ ...sim, numero: e.target.value })}
          />

          <button
            onClick={addSim}
            className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 font-medium text-white w-full rounded p-1"
          >
            Añadir SIM
          </button>
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="w-full bg-white p-5 rounded-xl shadow">
          <h1 className="font-medium mb-3">Equipos</h1>
          {product.equipos.map((e) => (
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              {e.marca} - {e.modelo} - {e.imei}
            </div>
          ))}
        </div>

        <div className="w-full bg-white p-5 rounded-xl shadow">
          <h1 className="font-medium mb-3">SIM CARD</h1>
          {product.sim.map((e) => (
            <div className="bg-gray-100 p-3 rounded-xl text-center">
              {e.telefonia} - {e.numero}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => createProduct(product, initial)}
          className="bg-gradient-to-r from-pink-500 to-orange-300 w-[50%] p-2 rounded text-white font-bold"
        >
          CREAR
        </button>
      </div>
    </div>
  );
};

export default FormInventario;

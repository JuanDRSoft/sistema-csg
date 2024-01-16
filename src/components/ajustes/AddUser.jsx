import React, { useEffect, useState } from "react";
import { BASE_URL, ocupaciones } from "../../utils/Data";
import { auth, db } from "../../../firebase";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import CardUser from "./CardUser";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  const { colaboradores } = useAuth();

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/mails/invitation`, {
        email,
        name,
        rol,
      });

      toast.success(data.mensaje);
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl mt-10">Agregar Usuarios</h1>
      <div className="flex mt-5 gap-5">
        <div className="bg-white p-5 w-full rounded-xl shadow">
          <form onSubmit={handleRegistro}>
            <label className="font-medium">Nombre</label>
            <input
              type="text"
              className="border w-full rounded-xl p-1 mt-1 mb-3"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="font-medium">Email</label>
            <input
              type="email"
              className="border w-full rounded-xl p-1 mt-1 mb-3"
              placeholder="correo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="font-medium">Ocupación</label>
            <select
              className="border w-full rounded-xl p-1 mt-1 mb-3"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="">Selecciona una ocupación</option>
              {ocupaciones.map((e) => (
                <option>{e}</option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-300 w-full p-1 rounded-xl shadow font-semibold text-white"
            >
              Enviar Invitación
            </button>
          </form>
        </div>
        <div className="bg-white p-5 w-full rounded-xl shadow">
          {colaboradores.filter((e) => e.registered).length ? (
            colaboradores
              .filter((e) => e.registered)
              .map((e) => <CardUser user={e} />)
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="font-medium">Aun no hay usuarios registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUser;

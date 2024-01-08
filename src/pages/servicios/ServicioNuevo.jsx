import React, { useState } from "react";
import useClient from "../../hooks/useClient";
import useAuth from "../../hooks/useAuth";

const ServicioNuevo = () => {
  const [name, setName] = useState("");
  const [razonSocial, setRazon] = useState("");
  const [cedula, setCedula] = useState("");
  const [ruc, setRuc] = useState("");
  const [ruc2, setRuc2] = useState("");
  const [phone, setPhone] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [serviceType, setType] = useState("");

  const [numeroPoliza, setPoliza] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [chasis, setChasis] = useState("");
  const [chapa, setChapa] = useState("");
  const [orden, setOrden] = useState("");
  const [instalacion, setInstalacion] = useState(new Date());
  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());

  const [user, setUser] = useState("");

  const { authUser } = useAuth();
  const { clients, newInstalation } = useClient();

  const initial = () => {
    setName("");
    setRazon("");
    setCedula("");
    setRuc("");
    setPhone("");
    setCelular("");
    setDireccion("");
    setType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const findRuc = clients.find((e) => e.ruc === `${ruc}-${ruc2}`);
    const findCC = clients.find((e) => e.cedula === cedula);

    if (findRuc) {
      toast.error("Este número RUC ya se encuentra registrado");
      return;
    } else if (findCC) {
      toast.error("Este número Cedula ya se encuentra registrado");
      return;
    } else {
      const body = {
        name,
        razonSocial,
        cedula,
        ruc: `${ruc}-${ruc2}`,
        phone,
        celular,
        direccion,
        serviceType,
        vehiculos: [
          {
            numeroPoliza,
            instalacion,
            desde,
            hasta,
            vehiculo,
            chasis,
            chapa,
            orden,
          },
        ],
      };

      const pendiente = {
        type: "newInstall",
        user: user,
        asignadoPor: authUser.uid,
        descripcion: `Asignación del GPS y Sim Card a ${name}`,
      };

      newInstalation(body, initial, pendiente);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Nueva Instalación</h1>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-2 mt-5 gap-10 relative pb-28"
      >
        <div>
          <p className="mb-5">
            Ingresa los datos del cliente para registrarlo:
          </p>
          <div>
            <label>Nombre</label>
            <input
              placeholder="Nombre completo"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label>Razón Social</label>
            <input
              placeholder="ej. KFC, pepsi, coca-cola"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={razonSocial}
              onChange={(e) => setRazon(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="mt-4">
              <label>Cédula</label>
              <input
                placeholder="123456789"
                type="number"
                className="w-full border-b-2 p-1 border-pink-500 outline-none"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label>RUC</label>
              <div className="flex gap-2">
                <input
                  placeholder="1234567"
                  type="number"
                  className="w-full border-b-2 p-1 border-pink-500 outline-none"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value.slice(0, 7))}
                  required
                />
                -
                <input
                  id="inputNumero"
                  placeholder="8"
                  type="number"
                  maxLength={1}
                  className="w-14 border-b-2 p-1 border-pink-500 outline-none"
                  onChange={(e) => setRuc2(e.target.value.slice(0, 1))}
                  value={ruc2}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="mt-4">
              <label>Teléfono</label>
              <input
                placeholder="+595 23423422"
                type="number"
                className="w-full border-b-2 p-1 border-pink-500 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label>Celular</label>
              <input
                placeholder="+595 23423422"
                type="number"
                className="w-full border-b-2 p-1 border-pink-500 outline-none"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label>Dirección</label>
            <input
              placeholder="Av. Calle 1 N2"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label>Tipo de Servicio (AESA/PART)</label>
            <select
              value={serviceType}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
            >
              <option value="">Selecciona un tipo</option>
              <option>AESA</option>
              <option>PART</option>
            </select>
          </div>

          <div className="mt-10 mb-5 flex items-center">
            <hr className="border border-black w-full" />
            <p className="w-full text-center font-bold text-2xl">
              Datos de vehiculo
            </p>
            <hr className="border border-black w-full" />
          </div>

          <p className="mb-5">
            Ingresa los datos del vehiculo para registrarlo:
          </p>

          <div className="mt-3">
            <label>Numero de poliza</label>
            <input
              placeholder="No. Poliza"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={numeroPoliza}
              onChange={(e) => setPoliza(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Fecha de Instalación</label>
            <input
              type="date"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={instalacion}
              onChange={(e) => setInstalacion(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="mt-3">
              <label>Vigencia (Póliza) desde</label>
              <input
                type="date"
                className="w-full border-b-2 p-1 border-pink-500 outline-none"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
                required
              />
            </div>

            <div className="mt-3">
              <label> Vigencia (Póliza) Hasta</label>
              <input
                type="date"
                min={desde}
                className="w-full border-b-2 p-1 border-pink-500 outline-none"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-3">
            <label>Vehículo</label>
            <input
              placeholder="TOYOTA Land Cruiser"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Chasis</label>
            <input
              placeholder="No. Chasis"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={chasis}
              onChange={(e) => setChasis(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Chapa</label>
            <input
              placeholder="Chapa"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={chapa}
              onChange={(e) => setChapa(e.target.value)}
              required
            />
          </div>

          <div className="mt-3">
            <label>Nro de Orden</label>
            <input
              placeholder="Número de orden"
              type="text"
              className="w-full border-b-2 p-1 border-pink-500 outline-none"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-5">Asignar un instalador:</p>

          <div className="bg-white p-5 flex justify-between rounded-xl shadow">
            <p>Juan Andres Rengifo</p>
            <p>juanA@gmail.com</p>
          </div>
        </div>

        <div className="absolute w-full flex justify-center bottom-5">
          <button
            type="submit"
            className="w-[50%]  mt-10 p-2 rounded-lg shadow-lg font-bold text-white bg-gradient-to-r from-pink-500 to-orange-300"
          >
            Guardar Datos
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicioNuevo;

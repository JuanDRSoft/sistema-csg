import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useClient from "../../hooks/useClient";
import { useParams } from "react-router-dom";
import SelectImei from "./SelectImei";
import SelectSim from "./SelectSim";

const NewVehicle = ({ isOpen, closeModal, vehicle, vehiculos }) => {
  const [numeroPoliza, setPoliza] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [chasis, setChasis] = useState("");
  const [chapa, setChapa] = useState("");
  const [orden, setOrden] = useState("");
  const [instalacion, setInstalacion] = useState(new Date());
  const [desde, setDesde] = useState(new Date());
  const [gps, setGps] = useState({
    hojaServicio: "",
    imei: "",
    sim: "",
    tecnico: "",
  });
  const [hasta, setHasta] = useState(new Date());

  const { updateVehicles } = useClient();
  const params = useParams();

  useEffect(() => {
    if (vehicle) {
      setPoliza(vehicle.numeroPoliza);
      setVehiculo(vehicle.vehiculo);
      setChasis(vehicle.chasis);
      setChapa(vehicle.chapa);
      setOrden(vehicle.orden);
      setInstalacion(vehicle.instalacion);
      setDesde(vehicle.desde);
      setHasta(vehicle.hasta);
      setGps(vehicle.gps);
    }
  }, [vehicle]);

  const initial = () => {
    setPoliza("");
    setVehiculo("");
    setChasis("");
    setChapa("");
    setOrden("");
    setInstalacion("");
    setDesde("");
    setHasta("");
    setGps({
      hojaServicio: "",
      imei: "",
      sim: "",
      tecnico: "",
    });
    closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vehicle) {
      const dataFilter = vehiculos.filter(
        (e) => e.numeroPoliza !== vehicle.numeroPoliza
      );
      const body = [
        ...dataFilter,
        {
          numeroPoliza,
          instalacion,
          desde,
          hasta,
          vehiculo,
          chasis,
          chapa,
          orden,
          gps,
        },
      ];

      updateVehicles(
        body,
        initial,
        "Datos de vehiculo editados correctamente",
        params.id
      );
    } else {
      const body = [
        ...vehiculos,
        {
          numeroPoliza,
          instalacion,
          desde,
          hasta,
          vehiculo,
          chasis,
          chapa,
          orden,
          gps,
        },
      ];

      updateVehicles(
        body,
        initial,
        "Datos de vehiculo añadidos correctamente",
        params.id
      );
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 px-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {vehicle?.numeroPoliza
                      ? "Editar Vehiculo"
                      : "Nuevo Vehiculo"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-5">Ingresa los datos para registrarlo:</p>
                    <form onSubmit={handleSubmit}>
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

                      <div className="mt-3">
                        <label>IMEI</label>
                        <SelectImei setGps={setGps} gps={gps} />
                      </div>

                      <div className="mt-3">
                        <label>SIM</label>
                        <SelectSim setGps={setGps} gps={gps} />
                      </div>

                      <div className="mt-3">
                        <label>Tecnico</label>
                        <input
                          placeholder="sin registro"
                          className="w-full border-b-2 p-1 border-pink-500 outline-none"
                          value={gps.tecnico}
                          onChange={(e) =>
                            setGps({ ...gps, tecnico: e.target.value })
                          }
                        />
                      </div>

                      <div className="mt-3">
                        <label>Hoja de servicio</label>
                        <input
                          placeholder="sin registro"
                          className="w-full border-b-2 p-1 border-pink-500 outline-none"
                          value={gps.hojaServicio}
                          onChange={(e) =>
                            setGps({ ...gps, hojaServicio: e.target.value })
                          }
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-10 p-2 uppercase rounded-lg shadow-lg font-bold text-white bg-gradient-to-r from-pink-500 to-orange-300"
                      >
                        {vehicle?.numeroPoliza
                          ? "Editar Vehiculo"
                          : "Crear Vehiculo"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewVehicle;

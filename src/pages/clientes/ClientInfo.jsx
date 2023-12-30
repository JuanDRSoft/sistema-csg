import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import Back from "../../utils/Back";
import VehicleCard from "../../components/clientes/VehicleCard";
import NewVehicle from "../../components/clientes/NewVehicle";
import useClient from "../../hooks/useClient";
import moment from "moment";

const ClientInfo = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [gpsData, setGps] = useState({});
  const [nota, setNota] = useState({
    id: 0,
    nota: "",
    date: new Date(),
  });
  const [service, setService] = useState();

  function generarId(longitud) {
    const caracteresPermitidos =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let idCorto = "";

    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(
        Math.random() * caracteresPermitidos.length
      );
      idCorto += caracteresPermitidos.charAt(indiceAleatorio);
    }

    return setNota({ ...nota, id: idCorto });
  }

  const [showGps, setShowGps] = useState(true);
  const [showNota, setShowNota] = useState(true);

  const { updateGps, updateNota, deleteClient } = useClient();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    name,
    razonSocial,
    cedula,
    ruc,
    phone,
    celular,
    direccion,
    serviceType,
    vehiculos,
    gps,
    notas,
  } = client;

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (gps) {
      setGps(gps);
    }
  }, [gps]);

  useEffect(() => {
    db.collection("clientes")
      .doc(params.id)
      .get()
      .then((doc) => {
        setClient(doc.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("clientes")
      .doc(params.id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setClient(doc.data());
          } else {
            console.log("El documento ya no existe.");
          }
        },
        (error) => {
          console.error("Error al escuchar cambios en el documento:", error);
        }
      );
    generarId(6);

    if (location.search.includes("service=asistencia")) {
      setService("Asistencia");
    }
  }, [params]);

  const handleNota = () => {
    const body = [...(notas || []), nota];

    updateNota(body, params.id);
    setNota({ nota: "", date: new Date(), id: generarId(6) });
    setShowNota(!showNota);
  };

  const deleteNota = (value) => {
    const filter = notas.filter((e) => e.id !== value.id);
    const body = filter;
    updateNota(body, params.id);
  };

  return loading ? (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <i class="fas fa-circle-notch animate-spin text-9xl text-pink-500"></i>
    </div>
  ) : (
    <div>
      <h1 className="font-bold text-3xl ">
        <Back /> {name}
      </h1>

      <hr className="w-full mt-5 mb-5 border-black" />

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white shadow rounded-xl p-5">
          <h1 className="text-center font-bold">Datos personales</h1>
          <hr className="mt-2" />

          <p className="mt-2 font-bold">
            C.C: <span className="font-normal">{cedula}</span>
          </p>

          <p className="mt-2 font-bold">
            Razón Social: <span className="font-normal">{razonSocial}</span>
          </p>

          <p className="mt-2 font-bold">
            RUC: <span className="font-normal">{ruc}</span>
          </p>

          <p className="mt-2 font-bold">
            Telefono: <span className="font-normal">{phone}</span>
          </p>

          <p className="mt-2 font-bold">
            Celular: <span className="font-normal">{celular}</span>
          </p>

          <p className="mt-2 font-bold">
            Dirección: <span className="font-normal">{direccion}</span>
          </p>

          <p className="mt-2 font-bold">
            Tipo de servicio: <span className="font-normal">{serviceType}</span>
          </p>

          <div className="mt-5 flex gap-5 text-white font-medium ">
            <button
              onClick={() => deleteClient(params.id)}
              className="w-full p-1 bg-red-500 rounded uppercase"
            >
              Eliminar
            </button>
          </div>
        </div>

        {service !== "Asistencia" && (
          <div className="bg-white shadow rounded-xl p-5">
            <h1 className="text-center font-bold">Vehiculos</h1>
            <hr className="mt-2" />

            <div className="h-56 overflow-y-auto">
              {vehiculos?.length ? (
                vehiculos.map((e) => (
                  <VehicleCard vehicle={e} vehiculos={vehiculos} />
                ))
              ) : (
                <div className="flex justify-center items-center pt-20">
                  Aún no hay vehiculos registrados
                </div>
              )}
            </div>

            <button
              onClick={openModal}
              className="bg-gradient-to-r mt-5 font-medium text-white p-1 rounded uppercase from-blue-500 to-cyan-400 w-full"
            >
              Añadir vehiculo
            </button>

            <NewVehicle
              isOpen={isOpen}
              closeModal={closeModal}
              vehiculos={vehiculos || []}
            />
          </div>
        )}

        <div className="bg-white shadow rounded-xl p-5">
          <h1 className="text-center font-bold">Datos de GPS</h1>
          <hr className="mt-2" />

          <div className="mt-2">
            <div className="mt-4 flex items-center gap-3">
              <label className="font-bold w-[40%]">Imei:</label>
              <input
                placeholder="sin registro"
                className="border rounded border-black pl-3 w-full disabled:border-none bg-white"
                disabled={showGps}
                value={gpsData.imei}
                onChange={(e) => setGps({ ...gpsData, imei: e.target.value })}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="font-bold w-[40%]">Sim Card:</label>
              <input
                placeholder="sin registro"
                className="border rounded border-black pl-3 w-full disabled:border-none bg-white"
                disabled={showGps}
                value={gpsData.sim}
                onChange={(e) => setGps({ ...gpsData, sim: e.target.value })}
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="font-bold w-[40%]">Hoja de Servicio:</label>
              <input
                placeholder="sin registro"
                className="border rounded border-black pl-3 w-full disabled:border-none bg-white"
                disabled={showGps}
                value={gpsData.hojaServicio}
                onChange={(e) =>
                  setGps({ ...gpsData, hojaServicio: e.target.value })
                }
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <label className="font-bold w-[40%]">Tecnico:</label>
              <input
                placeholder="sin registro"
                className="border rounded border-black pl-3 w-full disabled:border-none bg-white"
                disabled={showGps}
                value={gpsData.tecnico}
                onChange={(e) =>
                  setGps({ ...gpsData, tecnico: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex mt-6">
            {showGps ? (
              <button
                className="w-full p-1 text-white font-medium rounded bg-gradient-to-r from-blue-500 to-cyan-400"
                onClick={() => setShowGps(!showGps)}
              >
                Modificar Datos
              </button>
            ) : (
              <button
                onClick={() => {
                  updateGps(gpsData, params.id);
                  setShowGps(!showGps);
                }}
                className="w-full p-1 text-white font-medium rounded bg-gradient-to-r from-blue-500 to-cyan-400"
              >
                Guardar Datos
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h1 className="text-center font-bold">Notas</h1>
          <hr className="mt-2" />

          <div className="h-48 overflow-auto">
            {showNota ? (
              <>
                {notas ? (
                  notas.map((e) => (
                    <div className="bg-gray-50 mt-2 p-2 flex items-center">
                      <h1 className="w-full">{e.nota}</h1>
                      <p className="w-full">
                        {moment(new Date(e.date.seconds * 1000)).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                      <i
                        onClick={() => deleteNota(e)}
                        class="fas fa-backspace cursor-pointer hover:text-red-500"
                      ></i>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    No hay notas aún
                  </div>
                )}
              </>
            ) : (
              <div className="pt-3">
                <label>Escribe la nota</label>
                <textarea
                  className="w-full border h-32 mt-2 p-1"
                  value={nota.nota}
                  onChange={(e) => setNota({ ...nota, nota: e.target.value })}
                />
              </div>
            )}
          </div>

          {showNota ? (
            <button
              onClick={(e) => setShowNota(!showNota)}
              className="w-full mt-4 p-1 text-white font-medium rounded bg-gradient-to-r from-blue-500 to-cyan-400"
            >
              Crear Nota
            </button>
          ) : (
            <button
              onClick={handleNota}
              className="w-full mt-4 p-1 text-white font-medium rounded bg-gradient-to-r from-blue-500 to-cyan-400"
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;

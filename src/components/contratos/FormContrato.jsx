import React, { useEffect, useState } from "react";
import Back from "../../utils/Back";
import useClient from "../../hooks/useClient";
import SelectClientes from "./SelectClientes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const meses = [
  "",
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const FormContrato = () => {
  const { clients, createContrato } = useClient();
  const [contrato, setContrato] = useState({});
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [vigencias, setVigencias] = useState([]);

  const [client, setClient] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function generarPorMes(fechaInicio, fechaTermino) {
    let objetosPorMes = [];

    // Convierte las fechas a objetos Date
    let fechaActual = new Date(fechaInicio);
    const fechaFin = new Date(fechaTermino);

    // Mientras la fecha actual sea menor o igual a la fecha de término
    while (fechaActual <= fechaFin) {
      // Crea un objeto para el mes actual
      const objetoMes = {
        mes: fechaActual.getMonth() + 1, // Los meses en JavaScript van de 0 a 11
        año: fechaActual.getFullYear(),
        status: "Sin Pagar",
        referencia: "",
        recibo: false,
      };

      // Agrega el objeto al array
      objetosPorMes.push(objetoMes);

      // Avanza al siguiente mes
      fechaActual.setMonth(fechaActual.getMonth() + 1);
    }

    return setVigencias(objetosPorMes);
  }

  useEffect(() => {
    if (desde && hasta) {
      generarPorMes(desde, hasta);
    }
  }, [desde, hasta]);

  const initial = () => {
    navigate(`/app/clientes/${client.id}`);
  };

  const submit = () => {
    try {
      const body = {
        desde: desde,
        hasta: hasta,
        client: client,
        vigencias: vigencias,
      };

      if ([desde, hasta, client.name].includes("")) {
        toast.warning("Ingresa todos los datos necesarios");
        return;
      }

      createContrato(body, initial);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (state) => {
    switch (state) {
      case "Sin Pagar":
        return (
          <p className="bg-red-500 rounded-xl text-center text-white font-medium">
            {state}
          </p>
        );
      case "Pago":
        return (
          <p className="bg-green-500 rounded-xl text-center text-white font-medium">
            {state}
          </p>
        );
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">
        <Back /> Contrato
      </h1>

      <div className="mt-10 flex gap-5">
        <div className="w-full">
          <div className="w-full bg-white p-5 rounded-xl shadow">
            <div>
              <label className="font-medium">Cliente</label>
              <button
                onClick={() => setIsOpen(true)}
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-300 rounded-xl p-1 font-medium text-white"
              >
                Seleccionar Cliente
              </button>
            </div>

            <div className="mt-3">
              <label className="font-medium">Vigencia (Desde)</label>
              <input
                type="date"
                className="w-full border p-1 rounded-xl mt-2"
                value={desde}
                onChange={(e) => setDesde(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="font-medium">Vigencia (Hasta)</label>
              <input
                type="date"
                disabled={!desde}
                min={desde}
                className="w-full border p-1 rounded-xl mt-2"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
              />
            </div>
          </div>

          {client.name && (
            <div className="bg-white p-5 mt-5 rounded-xl shadow">
              <h1 className="font-medium text-center mb-3">{client.name}</h1>
              <p className="mb-2">Celular: {client.celular}</p>
              <p className="mb-2">Telefono: {client.phone}</p>
              <p className="mb-2">Razón Social: {client.razonSocial}</p>
              <p className="mb-2">Dirección: {client.direccion}</p>
              <p className="mb-2">Tipo de servicio: {client.serviceType}</p>
            </div>
          )}
        </div>
        <div className="w-full">
          {vigencias.map((e) => (
            <div className="bg-white p-5 mb-3 rounded-xl shadow flex items-center">
              <h1 className="font-medium capitalize w-full">
                {meses[e.mes]} - {e.año}
              </h1>
              <div className="w-full">{getStatus(e.status)}</div>
              <div className="w-full text-center">
                <i
                  class={`fas fa-print cursor-pointer ${
                    e.recibo ? "text-green-500" : "text-red-500"
                  }`}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex mt-10 justify-center">
        <button
          onClick={submit}
          className="text-white font-medium bg-gradient-to-r from-pink-500 to-orange-300 w-[50%] p-1 rounded-xl shadow"
        >
          GUARDAR
        </button>
      </div>

      <SelectClientes
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        setClient={setClient}
      />
    </div>
  );
};

export default FormContrato;

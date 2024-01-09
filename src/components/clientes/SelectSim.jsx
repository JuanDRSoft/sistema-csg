import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import useClient from "../../hooks/useClient";
import { useParams } from "react-router-dom";

const SelectSim = ({ setGps, gpsData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { inventory, updateInventorySim, updateGps } = useClient();

  const params = useParams();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const selectInventory = (i, e) => {
    var confirmacion = confirm(
      "¿Estás seguro de que deseas seleccionar esta SIM?, esta saldra del inventario"
    );

    if (confirmacion) {
      const filter = inventory.find((e) => e.id == i.id);

      const body = filter.sim.filter((event) => event.numero !== e.numero);

      const data = {
        imei: gpsData.imei || "",
        sim: e.numero,
        hojaServicio: gpsData.hojaServicio || "",
        tecnico: gpsData.tecnico || "",
      };

      updateInventorySim(body, i.id, closeModal, data, params.id);
    }
  };

  return (
    <div>
      {gpsData?.sim ? (
        <div
          className="cursor-pointer hover:bg-gray-100 pl-1 rounded-lg"
          onClick={openModal}
        >
          {gpsData?.sim}
        </div>
      ) : (
        <button
          onClick={openModal}
          className="w-full font-semibold shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 p-1 text-white text-sm"
        >
          <i class="fas fa-plus text-sm"></i> Seleccionar SIM
        </button>
      )}

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
                    Nueva SIM
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-5">Selecciona una SIM:</p>

                    <div className="flex p-2 mb-2 rounded-xl font-bold">
                      <p className="w-full">Numero</p>
                      <p className="w-full text-center">Telefonia</p>
                    </div>
                    {inventory.map((i) => (
                      <div>
                        {i.sim?.map((e) => (
                          <div
                            onClick={() => selectInventory(i, e)}
                            className="flex bg-gray-100 p-2 mb-2 rounded-xl cursor-pointer hover:bg-gray-200"
                          >
                            <p className="w-full">{e.numero}</p>
                            <p className="w-full text-center">{e.telefonia}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SelectSim;

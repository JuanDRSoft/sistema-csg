import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import useClient from "../../hooks/useClient";
import { useParams } from "react-router-dom";

const SelectImei = ({ setGps, gpsData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { inventory, updateInventory, updateGps } = useClient();

  const params = useParams();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const selectInventory = (i, e) => {
    var confirmacion = confirm(
      "¿Estás seguro de que deseas seleccionar este GPS?, este saldra del inventario"
    );

    if (confirmacion) {
      const filter = inventory.find((e) => e.id == i.id);

      const body = filter.equipos.filter((event) => event.imei !== e.imei);

      const data = {
        imei: e.imei,
        sim: gpsData.sim,
        hojaServicio: gpsData.hojaServicio,
        tecnico: gpsData.tecnico,
      };

      updateInventory(body, i.id, closeModal, data, params.id);
    }
  };

  return (
    <div>
      {gpsData?.imei ? (
        <div
          className="cursor-pointer hover:bg-gray-100 pl-1 rounded-lg"
          onClick={openModal}
        >
          {gpsData?.imei}
        </div>
      ) : (
        <button
          onClick={openModal}
          className="w-full font-semibold shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 p-1 text-white text-sm"
        >
          <i class="fas fa-plus text-sm"></i> Seleccionar Imei
        </button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Nuevo GPS
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-5">Selecciona un GPS:</p>

                    <div className="flex p-2 mb-2 rounded-xl font-bold">
                      <p className="w-full">Marca</p>
                      <p className="w-full text-center">Modelo</p>
                      <p className="w-full text-end">Imei</p>
                    </div>
                    {inventory.map((i) => (
                      <div>
                        {i.equipos?.map((e) => (
                          <div
                            onClick={() => selectInventory(i, e)}
                            className="flex bg-gray-100 p-2 mb-2 rounded-xl cursor-pointer hover:bg-gray-200"
                          >
                            <p className="w-full">{e.marca}</p>
                            <p className="w-full text-center">{e.modelo}</p>
                            <p className="w-full text-end">{e.imei}</p>
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

export default SelectImei;

import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import useClient from "../../hooks/useClient";

const SelectClientes = ({ isOpen, closeModal, setClient }) => {
  const { clients } = useClient();

  return (
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 px-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Seleccionar cliente
                </Dialog.Title>
                <div className="mt-2 overflow-y-auto">
                  {clients.map((e) => (
                    <div
                      onClick={() => {
                        setClient(e);
                        closeModal();
                      }}
                      className="bg-gray-100 mt-2 p-3 cursor-pointer hover:bg-gray-300 rounded-xl gap-3 flex justify-between"
                    >
                      <h1 className="w-full font-medium">{e.name}</h1>
                      <p className="w-full text-center">RUC: {e.ruc}</p>
                      <p className="w-full text-end">{e.serviceType}</p>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectClientes;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useClient from "../../hooks/useClient";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Modificaciones = ({ isOpen, closeModal }) => {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 px-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Modificacion
                </Dialog.Title>
                <div className="mt-2">
                  <p className="mb-5">Que cliente deseas modificar:</p>

                  <div>
                    {clients.map((e) => (
                      <Link
                        to={`/app/clientes/${e.id}?service=modificaciones`}
                        className="bg-gray-100 p-5 flex mb-3 rounded-xl shadow items-center cursor-pointer hover:bg-gray-100"
                      >
                        <h1 className="w-full font-semibold">{e.name}</h1>
                        <h1 className="w-full text-center">{e.razonSocial}</h1>
                        <h1 className="w-full text-end">{e.ruc}</h1>
                      </Link>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modificaciones;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function NewClient() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="font-semibold shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 p-1 px-4 text-white"
      >
        <i class="fas fa-plus text-sm"></i> Nuevo Cliente
      </button>

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
                    Nuevo Cliente
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-5">
                      Ingresa los datos del cliente para registrarlo:
                    </p>
                    <form>
                      <div>
                        <label>Nombre</label>
                        <input
                          placeholder="Nombre completo"
                          type="text"
                          className="w-full border-b-2 p-1 border-pink-500 outline-none"
                        />
                      </div>

                      <div className="mt-4">
                        <label>Razón Social</label>
                        <input
                          placeholder="ej. KFC, pepsi, coca-cola"
                          type="text"
                          className="w-full border-b-2 p-1 border-pink-500 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="mt-4">
                          <label>Cédula</label>
                          <input
                            placeholder="123456789"
                            type="number"
                            className="w-full border-b-2 p-1 border-pink-500 outline-none"
                          />
                        </div>

                        <div className="mt-4">
                          <label>RUC</label>
                          <input
                            placeholder="2133123211"
                            type="number"
                            className="w-full border-b-2 p-1 border-pink-500 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="mt-4">
                          <label>Teléfono</label>
                          <input
                            placeholder="+595 23423422"
                            type="number"
                            className="w-full border-b-2 p-1 border-pink-500 outline-none"
                          />
                        </div>

                        <div className="mt-4">
                          <label>Celular</label>
                          <input
                            placeholder="+595 23423422"
                            type="number"
                            className="w-full border-b-2 p-1 border-pink-500 outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label>Dirección</label>
                        <input
                          placeholder="Av. Calle 1 N2"
                          type="number"
                          className="w-full border-b-2 p-1 border-pink-500 outline-none"
                        />
                      </div>

                      <div className="mt-4">
                        <label>Tipo de Servicio (AESA/PART)</label>
                        <select className="w-full border-b-2 p-1 border-pink-500 outline-none">
                          <option>Selecciona un tipo</option>
                          <option>AESA</option>
                          <option>PART</option>
                        </select>
                      </div>

                      <button className="w-full mt-10 p-2 rounded-lg shadow-lg font-bold text-white bg-gradient-to-r from-pink-500 to-orange-300">
                        CREAR CLIENTE
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
}

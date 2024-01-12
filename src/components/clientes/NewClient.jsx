import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useClient from "../../hooks/useClient";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [razonSocial, setRazon] = useState("");
  const [cedula, setCedula] = useState("");
  const [ruc, setRuc] = useState("");
  const [ruc2, setRuc2] = useState("");
  const [phone, setPhone] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [serviceType, setType] = useState("");

  const { createClient, clients } = useClient();
  const location = useLocation();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const initial = () => {
    setName("");
    setRazon("");
    setCedula("");
    setRuc("");
    setPhone("");
    setCelular("");
    setDireccion("");
    setType("");
    closeModal();
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
      createClient(
        {
          name,
          razonSocial,
          cedula,
          ruc: `${ruc}-${ruc2}`,
          phone,
          celular,
          direccion,
          serviceType,
          servicios: [{ servicio: "Nueva Instalación", date: new Date() }],
        },
        initial
      );
    }
  };

  useEffect(() => {
    if (location.search.includes("type=new-install")) {
      openModal();
    }
  }, [location]);

  return (
    <>
      <button
        onClick={openModal}
        className="font-semibold shadow-lg rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 p-1 px-4 text-white"
      >
        <i class="fas fa-plus text-sm"></i> Nuevo Cliente
      </button>

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
                    Nuevo Cliente
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-5">
                      Ingresa los datos del cliente para registrarlo:
                    </p>
                    <form onSubmit={handleSubmit}>
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
                              onChange={(e) =>
                                setRuc(e.target.value.slice(0, 7))
                              }
                              required
                            />
                            -
                            <input
                              id="inputNumero"
                              placeholder="8"
                              type="number"
                              maxLength={1}
                              className="w-14 border-b-2 p-1 border-pink-500 outline-none"
                              onChange={(e) =>
                                setRuc2(e.target.value.slice(0, 1))
                              }
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

                      <button
                        type="submit"
                        className="w-full mt-10 p-2 rounded-lg shadow-lg font-bold text-white bg-gradient-to-r from-pink-500 to-orange-300"
                      >
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

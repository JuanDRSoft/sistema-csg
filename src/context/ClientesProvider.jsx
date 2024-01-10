import React from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const [clients, setClients] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [contratos, setContratos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    db.collection("clientes").onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setClients(platillos);
    }

    db.collection("inventario").onSnapshot(manejarSnapshotInv);

    function manejarSnapshotInv(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setInventory(platillos);
    }

    db.collection("contratos").onSnapshot(manejarSnapshotContra);

    function manejarSnapshotContra(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setContratos(platillos);
    }
  }, []);

  const createClient = (body, initial) => {
    db.collection("clientes")
      .add(body)
      .then((client) => {
        toast.success(
          "Cliente creado correctamente, completa los datos restantes",
          3000
        );
        initial();
        navigate(`/app/clientes/${client.id}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear el cliente intenta nuevamente");
      });
  };

  const updateVehicles = (body, initial, succes, id) => {
    db.collection("clientes")
      .doc(id)
      .update({ vehiculos: body })
      .then(() => {
        console.log(body);
        const filterImei = inventory.find((e) => e.id == body[0].gps.imei.id);

        const imei = filterImei.equipos.filter(
          (event) => event.imei !== body[0].gps.imei.imei
        );

        db.collection("inventario")
          .doc(body[0].gps.imei.id)
          .update({ equipos: imei })
          .then(() => {
            const filterSim = inventory.find((e) => e.id == body[0].gps.sim.id);

            const sim = filterSim.sim.filter(
              (event) => event.numero !== body[0].gps.sim.numero
            );

            db.collection("inventario")
              .doc(body[0].gps.sim.id)
              .update({ sim: sim })
              .then(() => {
                toast.success(succes);
                initial();
              });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo editar el vehiculo intenta nuevamente");
      });
  };

  const updateNota = (body, id) => {
    db.collection("clientes")
      .doc(id)
      .update({ notas: body })
      .then(() => {
        toast.success("Nota modificada correctamente");
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear la nota intenta nuevamente");
      });
  };

  const deleteClient = (id) => {
    db.collection("clientes")
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Cliente eliminado correctamente");
        navigate("/app/clientes");
      });
  };

  const createProduct = (body, initial) => {
    db.collection("inventario")
      .doc()
      .set(body)
      .then(() => {
        toast.success("Producto creado correctamente");
        initial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear el cliente intenta nuevamente");
      });
  };

  const updateProduct = (body, id, initial) => {
    db.collection("inventario")
      .doc(id)
      .update(body)
      .then(() => {
        toast.success("Inventario modificado correctamente");
        initial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear la nota intenta nuevamente");
      });
  };

  const updateInventory = (body, id, initial, gpsData, client) => {
    db.collection("clientes")
      .doc(client)
      .update({ gps: gpsData })
      .then(() => {
        db.collection("inventario")
          .doc(id)
          .update({ equipos: body })
          .then(() => {
            toast.success("GPS modificado correctamente");
            initial();
          })
          .catch((error) => {
            console.log(error);
            toast.error("No se pudo seleccionar GPS intenta nuevamente");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo editar el gps intenta nuevamente");
      });
  };

  const updateInventorySim = (body, id, initial, gpsData, client) => {
    db.collection("clientes")
      .doc(client)
      .update({ gps: gpsData })
      .then(() => {
        db.collection("inventario")
          .doc(id)
          .update({ sim: body })
          .then(() => {
            toast.success("GPS modificado correctamente");
            initial();
          })
          .catch((error) => {
            console.log(error);
            toast.error("No se pudo seleccionar SIM intenta nuevamente");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo editar el gps intenta nuevamente");
      });
  };

  const createContrato = (body, initial) => {
    db.collection("contratos")
      .doc()
      .set(body)
      .then(() => {
        toast.success("Contrato creado correctamente");
        initial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear intenta nuevamente");
      });
  };

  const newInstalation = (body, initial, pendientes) => {
    db.collection("clientes")
      .add(body)
      .then((client) => {
        db.collection("pendientes")
          .add({ ...pendientes, cliente: client.id })
          .then(() => {
            toast.success("Creación de cliente realizado correctamente");
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear el cliente intenta nuevamente");
      });
  };

  return (
    <ClientContext.Provider
      value={{
        createClient,
        clients,
        updateVehicles,
        updateNota,
        deleteClient,
        inventory,
        createProduct,
        updateProduct,
        contratos,
        createContrato,
        updateInventory,
        updateInventorySim,
        newInstalation,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
export { ClientProvider };

export default ClientContext;

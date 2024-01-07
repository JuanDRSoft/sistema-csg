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
      .doc()
      .set(body)
      .then(() => {
        toast.success(
          "Cliente creado correctamente, completa los datos restantes dando clic sobre el cliente"
        );
        initial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo crear el cliente intenta nuevamente");
      });
  };

  const updateClient = (body, initial, succes, id) => {
    db.collection("clientes")
      .doc(id)
      .update({ vehiculos: body })
      .then(() => {
        toast.success(succes);
        initial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo editar el vehiculo intenta nuevamente");
      });
  };

  const updateGps = (body, id) => {
    db.collection("clientes")
      .doc(id)
      .update({ gps: body })
      .then(() => {
        toast.success("Gps modificado correctamente");
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo editar el gps intenta nuevamente");
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

  return (
    <ClientContext.Provider
      value={{
        createClient,
        clients,
        updateClient,
        updateGps,
        updateNota,
        deleteClient,
        inventory,
        createProduct,
        updateProduct,
        contratos,
        createContrato,
        updateInventory,
        updateInventorySim,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
export { ClientProvider };

export default ClientContext;

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
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
export { ClientProvider };

export default ClientContext;

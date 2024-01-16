import React from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const [usuarioData, setUsuarioData] = useState({});
  const [events, setEvents] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // El usuario ha iniciado sesión
        setAuthUser(user);
      } else {
        // No hay usuario logueado
        // navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const data = db.collection("usuarios").doc(authUser.uid);

    data
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsuarioData(doc.data());
        } else {
          console.log("El documento no existe.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento:", error);
      });

    data.onSnapshot(
      (doc) => {
        if (doc.exists) {
          setUsuarioData(doc.data());
        } else {
          console.log("El documento ya no existe.");
        }
      },
      (error) => {
        console.error("Error al escuchar cambios en el documento:", error);
      }
    );

    db.collection("usuarios").onSnapshot(manejarSnapshotAuth);

    function manejarSnapshotAuth(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setColaboradores(platillos);
    }

    db.collection("events").orderBy("time").onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setEvents(platillos);
    }
  }, [authUser]);

  const cerrarSesionAuth = () => {
    auth
      .signOut()
      .then(function () {
        // Cierre de sesión exitoso
        toast.success("Cierre de sesión exitoso");
        setAuthUser({});
        navigate("/");
      })
      .catch(function (error) {
        // Manejar errores al cerrar sesión
        console.error("Error al cerrar sesión:", error.code, error.message);
      });
  };

  const onLogin = (email, password, e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        var user = userCredential.user;
        if (user) {
          navigate("/app");
          toast.success(`Hola ${authUser.displayName} bienvenido !`);
        }
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        toast.error("Verifica los datos ingresados");
      });
  };

  const updateNota = (body, id, type) => {
    db.collection("events")
      .doc(id)
      .update({ notas: body, status: type })
      .then(() => {
        toast.success("Nota agregada correctamente");
      })
      .catch((error) => {
        console.log(error);
        toast.error("No se pudo editar el vehiculo intenta nuevamente");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        cargando,
        cerrarSesionAuth,
        authUser,
        usuarioData,
        onLogin,
        events,
        updateNota,
        colaboradores,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;

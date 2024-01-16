import React, { useEffect, useState } from "react";
import Logo from "/logo.svg";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, authUser } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getUSer = async () => {
      await db
        .collection("usuarios")
        .doc(params.id)
        .get()
        .then((doc) => {
          const data = doc.data();

          setEmail(data.email);
          setName(data.username);
        })
        .catch((err) => {
          navigate("/");
          console.log(err);
        });
    };

    getUSer();
  }, [params]);

  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      await user.updateProfile({
        displayName: name,
      });

      await db.collection("usuarios").doc(params.id).update({
        registered: true,
      });

      toast.success("Registrado correctamente");
      navigate("/app");
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <div className="max-w-[400px]">
        <div className="flex justify-center mb-10">
          <img src={Logo} className="w-24" />
        </div>

        <form onSubmit={register}>
          <p className="text-center mb-5 font-semibold">
            Registra tu contraseña
          </p>

          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full p-3 mb-4 text-center"
            value={name}
            disabled
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 text-center"
            disabled
            value={email}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="text-white bg-gray-500 font-semibold p-2 w-[50%]"
            >
              REGISTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

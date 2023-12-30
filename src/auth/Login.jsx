import React, { useEffect, useState } from "react";
import Logo from "/logo.svg";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, authUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser.uid) {
      navigate("/app");
    }
  }, [authUser]);

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <div>
        <div className="flex justify-center mb-10">
          <img src={Logo} className="w-24" />
        </div>

        <form onSubmit={(e) => onLogin(email, password, e)}>
          <p className="text-center mb-5 font-semibold">
            Inicia Sesión en tu cuenta
          </p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <input type="checkbox" className="mr-2" />{" "}
            <label htmlFor="" className="text-gray-500 font-semibold">
              Mantener sesion iniciada
            </label>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="text-white bg-gray-500 font-semibold p-2 w-[50%]"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import Logo from "/logo.svg";

const Login = () => {
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <div>
        <div className="flex justify-center mb-10">
          <img src={Logo} className="w-24" />
        </div>

        <form>
          <p className="text-center mb-5 font-semibold">
            Inicia Sesión en tu cuenta
          </p>
          <input placeholder="Email" className="w-full p-3 mb-4" />
          <input placeholder="Password" className="w-full p-3 mb-4" />

          <div>
            <input type="checkbox" className="mr-2" />{" "}
            <label htmlFor="" className="text-gray-500 font-semibold">
              Mantener sesion iniciada
            </label>
          </div>

          <div className="mt-10 flex justify-center">
            <button className="text-white bg-gray-500 font-semibold p-2 w-[50%]">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";

const Home = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Eventos</h1>

      <div className="mt-10 flex gap-5">
        <button className="border-b-2 border-pink-600 p-2 font-semibold">
          Activos
        </button>
        <button className="border-b-2 border-pink-600 p-2 font-semibold">
          Procesados
        </button>
      </div>
    </div>
  );
};

export default Home;

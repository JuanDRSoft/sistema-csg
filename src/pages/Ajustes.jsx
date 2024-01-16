import React from "react";
import { ocupaciones } from "../utils/Data";
import AddUser from "../components/ajustes/AddUser";

const Ajustes = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Ajustes</h1>

      <div>
        <AddUser />
      </div>
    </div>
  );
};

export default Ajustes;

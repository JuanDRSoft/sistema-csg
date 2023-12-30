import React from "react";
import { useContext } from "react";
import ClientContext from "../context/ClientesProvider";

const useClient = () => {
  return useContext(ClientContext);
};

export default useClient;

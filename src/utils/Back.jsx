import React from "react";
import { useNavigate } from "react-router-dom";

const Back = ({ msg, status }) => {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    if (msg) {
      if (status == "Processed") {
        navigate(-1);
        return;
      }

      var confirmacion = confirm(
        "¿Estás seguro de que deseas salir del evento sin procesar?"
      );

      if (confirmacion) {
        navigate(-1);
      } else {
        console.log("Eliminación cancelada");
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <i
      class="fas fa-arrow-left cursor-pointer hover:text-blue-500"
      onClick={handleGoBack}
    ></i>
  );
};

export default Back;

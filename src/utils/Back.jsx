import React from "react";
import { useNavigate } from "react-router-dom";

const Back = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // También puedes usar navigate('back')
  };

  return (
    <i
      class="fas fa-arrow-left cursor-pointer hover:text-blue-500"
      onClick={handleGoBack}
    ></i>
  );
};

export default Back;

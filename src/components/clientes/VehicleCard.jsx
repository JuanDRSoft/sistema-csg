import React, { useState } from "react";
import NewVehicle from "./NewVehicle";

const VehicleCard = ({ vehicle, vehiculos }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        onClick={openModal}
        className="bg-gray-50 p-2 mt-2 rounded cursor-pointer hover:bg-gray-200"
      >
        {vehicle.vehiculo}
      </div>

      <NewVehicle
        isOpen={isOpen}
        closeModal={closeModal}
        vehicle={vehicle}
        vehiculos={vehiculos}
      />
    </>
  );
};

export default VehicleCard;

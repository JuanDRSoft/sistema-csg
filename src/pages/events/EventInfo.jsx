import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import mapboxgl from "mapbox-gl";
import SetStatus from "../../components/events/SetStatus";

const EventInfo = () => {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [nota, setNota] = useState({});
  const params = useParams();
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const myLocation = () => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 9,
    });

    new mapboxgl.Marker()
      .setLngLat([event?.longitude, event.latitude])
      .addTo(map);

    map.setCenter([event?.longitude, event.latitude]);
  };

  useEffect(() => {
    db.collection("events")
      .doc(params.id)
      .get()
      .then((doc) => {
        setEvent(doc.data());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    db.collection("events")
      .doc(params.id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setEvent(doc.data());
          } else {
            console.log("El documento ya no existe.");
          }
        },
        (error) => {
          console.error("Error al escuchar cambios en el documento:", error);
        }
      );
  }, [params]);

  useEffect(() => {
    if (event.latitude) {
      myLocation();
    }
  }, [event]);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-10">Evento</h1>

      <div id="map" className="w-full h-[40vh]"></div>

      <div className="mt-10 grid grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow p-5">
          <h1 className="text-center font-bold">Data</h1>
          <hr className="mt-2" />

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Status
            </p>
            <div className="w-full p-5 bg-gray-100 rounded-r-xl flex justify-center">
              <SetStatus
                status={event?.status}
                id={params.id}
                setNota={setNota}
              />
            </div>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Name
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.name}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Additional Notes
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.additional_notes}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Object Owner
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.object_owner}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Plate Number
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.plate_number}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Registration Number
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.registration_number}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              SIM Number
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.sim_number}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Stop Duration
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.fuel_detect_sec_after_stop}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Type
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">{event?.type}</p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              VIN
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.vin}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Created
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.created_at}
            </p>
          </div>

          <div className="mt-2 flex">
            <p className="p-5 bg-blue-500 rounded-l-xl w-[40%] font-bold text-white">
              Last Update
            </p>
            <p className="w-full p-5 bg-gray-100 rounded-r-xl">
              {event?.device?.updated_at}
            </p>
          </div>
        </div>

        <div className="">
          {nota.type && (
            <div className="bg-white rounded-xl shadow p-5">
              <h1 className="text-center font-bold">Nota</h1>
              <hr className="mt-2 mb-2" />

              <label>Escribe una nota</label>
              <textarea
                className="w-full border mt-2 rounded-xl h-28 p-2"
                onChange={(e) => setNota({ ...nota, nota: e.target.value })}
              />

              <button className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 w-full text-white font-medium p-1 rounded-xl">
                GUARDAR
              </button>
            </div>
          )}

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;

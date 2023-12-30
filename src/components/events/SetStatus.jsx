import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

const SetStatus = ({ status, id, setNota }) => {
  const handleNota = (e) => {
    setNota({
      type: e,
      nota: "",
      date: new Date(),
    });
  };

  return (
    <div className="top-16 w-full text-right">
      <Menu as="div" className="relative text-left">
        <div>
          <Menu.Button
            className={`flex items-center gap-2 ${
              status == "Processed"
                ? "bg-green-200 text-green-700"
                : "bg-yellow-200 text-yellow-700"
            } p-2 rounded-xl px-5`}
          >
            {status || "Unprocessed"}
            <i class="fas fa-sort-down"></i>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {(!status || status == "Unprocessed") && (
                <Menu.Item>
                  <button
                    onClick={() => handleNota("Processed")}
                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Processed
                  </button>
                </Menu.Item>
              )}

              {status == "Processed" && (
                <Menu.Item>
                  <button
                    onClick={() => handleNota("Unprocessed")}
                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Unprocessed
                  </button>
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default SetStatus;

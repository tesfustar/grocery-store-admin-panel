import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useHome } from "../context/HomeContext";

const ToastContainer = () => {
  const [show, setShow] = useState<boolean>(false);
  const { messageType, setMessageType } = useHome();

  useEffect(() => {
    if (messageType) {
      setShow(true);
    }

    setTimeout(() => {
      setShow(false);
      setMessageType(null);
    }, 6000);
  }, [messageType]);

  return (
    <>
      {messageType && (
        <div
          className="transition duration-300 ease-in-out fixed border h-20 bottom-11 py-3 px-6  drop-shadow-2xl z-[1056]   h max-w-xs w-full right-10 bg-white rounded   text-sm  inline-flex items-center  "
          role="alert"
        >
          {messageType.type === "SUCCESS" ? (
            <>
              <span className="text-green-500 text-bold text-3xl ">
                <AiFillCheckCircle />
              </span>
              <div className="h-5/6 w-1 rounded-sm bg-green-500 mx-4"></div>
              <div className="flex flex-col">
                <h1 className="text-sm  text-green-700">{messageType.type}</h1>
                <p className="text-xs text-gray-500">{messageType.message}</p>
              </div>
            </>
          ) : (
            <>
              <span className="text-red-500 text-bold text-3xl ">
                <AiFillCheckCircle />
              </span>
              <div className="h-5/6 w-1 rounded-sm bg-red-500 mx-4"></div>
              <div className="flex flex-col">
                <h1 className="text-sm  text-red-700">{messageType.type}</h1>
                <p className="text-xs text-gray-500">
                  {messageType.message
                    ? messageType.message
                    : "try again later!"}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ToastContainer;

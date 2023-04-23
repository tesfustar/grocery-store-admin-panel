import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../types/User";
import DeliveryTable from "./components/DeliveryTable";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import AddDeliveryModal from "./components/AddDeliveryModal";
const Delivery: FC = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [deliveries, setDeliveries] = useState<IUser[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch deliveries
  const deliveriesData = useQuery(
    ["deliveriesData", stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/deliveries`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setDeliveries(
          res?.data?.data?.map((data: object, index: number) => ({
            ...data,
            index: index + 1,
          }))
        );
      },
    }
  );
  return (
    <div className="p-3  bg-white">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-blue-color">
          {isAmh ? "አድራሾች" : "Deliveries"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "አድራሽ ጨምር" : "Add Delivery"}
        </button>
      </div>
      {/*  */}
      {deliveriesData.isFetched && deliveriesData.isSuccess ? (
        <div>
          {deliveriesData?.data?.data?.data?.length > 0 ? (
            <DeliveryTable
              deliveries={deliveries}
              setStateChange={setStateChange}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold text-center">
              {isAmh ? "መላኪያ ሰው የለም!" : "There are No Deliveries !"}
            </h1>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={mainColor}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
      <AddDeliveryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setStateChange={setStateChange}
      />
    </div>
  );
};

export default Delivery;

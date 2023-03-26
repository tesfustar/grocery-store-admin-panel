import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../context/AuthContext";
import { buttonStyle } from "../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/User";
import DeliveryTable from "./components/DeliveryTable";
import { useHome } from "../../context/HomeContext";
import BreedCrumb from "../../utils/BreedCrumb";
const Delivery: FC = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
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
    <div className="p-3">
        <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "አድራሾች" : "Deliveries"}
        </h1>
      </div>
      {/*  */}
      {deliveriesData.isFetched && deliveriesData.isSuccess ? (
        <div>
          <DeliveryTable
            deliveries={deliveries}
            setStateChange={setStateChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#f05454"}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
    </div>
  );
};

export default Delivery;

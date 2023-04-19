import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { ICoupon } from "../../../types/Coupon";
import TotalOrderTable from "./components/TotalOrderTable";

const Order = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [orders, setOrders] = useState([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch orders
  const ordersData = useQuery(
    ["totalOrdersData", stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}order/admin`,
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
        setOrders(
          res?.data?.data?.map((data: object, index: number) => ({
            ...data,
            index: index + 1,
          }))
        );
      },
    }
  );
  return (
    <div className="bg-white p-3">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ትዕዛዞች" : "Orders"}
        </h1>
      </div>

      {/*  */}
      {ordersData.isFetched && ordersData.isSuccess ? (
        <div className="flex items-center justify-center w-full">
          {ordersData?.data?.data?.data?.length > 0 ? (
            <TotalOrderTable orders={orders} setStateChange={setStateChange} />
          ) : (
            <h1 className="text-blue-color capitalize font-medium text-lg">
              {isAmh ? "እስካሁን ምንም ትዕዛዞች አልተገኙም" : "No Orders found yet!"}
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
    </div>
  );
};

export default Order;

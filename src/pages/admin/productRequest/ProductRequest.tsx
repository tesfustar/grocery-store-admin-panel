import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import RequestTable from "./components/RequestTable";
import { IProductRequest } from "../../../types/Request";

const ProductRequest = () => {
  const { token } = useAuth();
  const { isAmh } = useHome();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [requests, setRequests] = useState<Array<IProductRequest>>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //product request
  const requestData = useQuery(
    ["requestData", stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}productRequest/all`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setRequests(
          res?.data?.data?.map((data: object, index: number) => ({
            ...data,
            index: index + 1,
          }))
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  return (
    <div className="bg-white p-3">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-blue-color">
          {isAmh ? "የምርት ጥያቄዎች" : "Product Requests"}
        </h1>
      </div>

      {requestData.isFetched && requestData.isSuccess ? (
        <div className="flex items-center justify-center w-full">
          {requestData?.data?.data?.data?.length > 0 ? (
            <RequestTable requests={requests} setStateChange={setStateChange} />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold">
              {isAmh ? "" : "No Request found !"}
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

export default ProductRequest;

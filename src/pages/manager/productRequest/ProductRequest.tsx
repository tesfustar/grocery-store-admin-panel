import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import ProductRequestTable from "./components/ProductRequestTable";
import { IProductRequest } from "../../../types/Request";
import { useNavigate } from "react-router-dom";

const ProductRequest = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate()
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
    [`productRequestData${user?.branch}`, stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}productRequest/branch/${user?.branch}`,
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
        <button onClick={() => navigate('/product/request/new')} className={buttonStyle}>
          {isAmh ? "ፕሮዳክት ጨምር" : "Send New Request"}
        </button>
      </div>

      {requestData.isFetched && requestData.isSuccess ? (
        <div className="flex items-center justify-center w-full">
          {requestData?.data?.data?.data?.length > 0 ? (
            <ProductRequestTable
              requests={requests}
              setStateChange={setStateChange}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold">
              {isAmh ? "እስካሁን ምንም የምርት ጥያቄ አላቀረቡም" : "You didn't made any product request yet!"}
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

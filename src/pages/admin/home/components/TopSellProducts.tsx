import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../../types/Product";
import TopSellProductTable from "./TopSellProductTable";
import { useHome } from "../../../../context/HomeContext";
const TopSellProducts = () => {
  const { token } = useAuth();
  const { isAmh } = useHome();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch products
  const productData = useQuery(
    ["topSellProductsData"],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}product/top-sell`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setProducts(res?.data?.data?.map((data: object, index: number) => ({...data,index: index + 1})));
      },
    }
  );
  return (
    <div className="w-full">

      {/*  */}
      {productData.isFetched && productData.isSuccess ? (
        <div>
          {productData?.data?.data?.data?.length > 0 ? (
            <TopSellProductTable products={products}  />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold text-center">
              {isAmh ? "" : "No products found !"}
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


export default TopSellProducts
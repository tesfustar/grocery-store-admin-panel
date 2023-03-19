import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../context/AuthContext";
import { buttonStyle } from "../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../types/Product";
import ProductTable from "./components/ProductTable";
const Product = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch products
  const productData = useQuery(
    ["productsData", stateChange],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}product`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setProducts(
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
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">Products</h1>
        <button
          onClick={() => navigate("/add-product")}
          className={buttonStyle}
        >
          Add Product
        </button>
      </div>
      {/*  */}
      {productData.isFetched && productData.isSuccess ? (
        <div>
          <ProductTable
            products={products}
            setStateChange={setStateChange}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#34d399"}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
    </div>
  );
};

export default Product;

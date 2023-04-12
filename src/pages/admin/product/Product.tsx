import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../types/Product";
import ProductTable from "./components/ProductTable";
import BreedCrumb from "../../../utils/BreedCrumb";
import { useHome } from "../../../context/HomeContext";
const Product = () => {
  const { token } = useAuth();
  const { isAmh } = useHome();
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
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}product/admin`, {
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
    <div className="p-3 bg-white">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ምርቶች " : "Products"}
        </h1>
        <button
          onClick={() => navigate("/products/add-product")}
          className={buttonStyle}
        >
          {isAmh ? "ፕሮዳክት ጨምር" : "Add Product"}
        </button>
      </div>
      {/*  */}
      {productData.isFetched && productData.isSuccess ? (
        <div>
          {productData?.data?.data?.data?.length > 0 ? (
            <ProductTable products={products} setStateChange={setStateChange} />
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

export default Product;

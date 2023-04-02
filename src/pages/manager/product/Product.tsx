import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import { useHome } from "../../../context/HomeContext";
import { IBranchProduct } from "../../../types/Product";
import AddProductModal from "./components/AddProductModal";
const Product = () => {
  const { token,user } = useAuth();
  const { isAmh } = useHome();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [products, setProducts] = useState<IBranchProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch products
  const branchProductData = useQuery(
    ["BranchProductsData", stateChange],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}branch-admin/products/${user.branch}`, {
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
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ምርቶች " : "Products"}
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className={buttonStyle}
        >
          {isAmh ? "ፕሮዳክት ጨምር" : "Add Product"}
        </button>
      </div>
      {/*  */}
      {branchProductData.isFetched && branchProductData.isSuccess ? (
        <div>
          {branchProductData?.data?.data?.data?.length > 0 ? (
            <ProductTable 
            products={products} 
            setStateChange={setStateChange}
            setEditProductId={setEditProductId}
        setIsModalOpen={setIsModalOpen}
            />
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
            color={"#34d399"}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
        <AddProductModal
        setEditProductId={setEditProductId}
        setIsModalOpen={setIsModalOpen}
        editProductId={editProductId}
        isModalOpen={isModalOpen}
        setStateChange={setStateChange}
      />
    </div>
  );
};

export default Product;

import React, { useState } from "react";
import AddCategoryModal from "./components/AddCategoryModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoryTable from "./components/CategoryTable";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { ICategory } from "../../../types/Category";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
const Category: React.FC = () => {
  const { token } = useAuth();
  const { isAmh } = useHome();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch categories
  const categoryData = useQuery(
    ["categoryData", stateChange],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}category/admin`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setCategories(
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
    <div className="p-3">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ምድቦች" : "Categories"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "ምድብ ጨምር" : "Add Category"}
        </button>
      </div>
      {categoryData.isFetched && categoryData.isSuccess ? (
        <div className="flex items-center justify-center w-full">
          {categoryData?.data?.data?.data?.length > 0 ? (
            <CategoryTable
              categories={categories}
              setStateChange={setStateChange}
              setEditCategoryId={setEditCategoryId}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold">
              {isAmh ? "" : "No Categories found !"}
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
      <AddCategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setEditCategoryId={setEditCategoryId}
        editCategoryId={editCategoryId}
        setStateChange={setStateChange}
      />
    </div>
  );
};

export default Category;

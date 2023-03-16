import React, { useState } from "react";
import AddCategoryModal from "./components/AddCategoryModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${token}`,
  };
  //fetch categories
  const categoryData = useQuery(
    ["categoryData"],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}category`, {
        headers,
      }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {
        console.log(res.data);
      },
    }
  );
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-dark-gray">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-main-bg p-2 px-5 rounded-sm text-white text-sm font-medium hover:bg-main-bg/90"
        >
          Add Category
        </button>
      </div>
      <AddCategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setEditCategoryId={setEditCategoryId}
        editCategoryId={editCategoryId}
      />
    </div>
  );
};

export default Category;

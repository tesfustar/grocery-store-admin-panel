import React, { useState } from "react";
import AddCategoryModal from "./components/AddCategoryModal";

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
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

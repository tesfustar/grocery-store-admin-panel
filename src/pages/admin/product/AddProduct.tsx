import React from "react";
import AddProductForm from "../../../forms/adminForm/AddProductForm";
import BreedCrumb from "../../../utils/BreedCrumb";

const AddProduct = () => {
  return (
    <div>
      <BreedCrumb />
      <div>
        <h1 className="text-xl font-semibold">Add New Product</h1>
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;

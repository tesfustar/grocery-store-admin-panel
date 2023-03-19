import React from "react";
import AddProductForm from "../../forms/AddProductForm";

const AddProduct = () => {
  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold">Add New Product</h1>
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;

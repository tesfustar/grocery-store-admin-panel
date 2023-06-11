import React from "react";
import AddProductForm from "../../../forms/adminForm/AddProductForm";
import BreedCrumb from "../../../utils/BreedCrumb";
import { useParams } from "react-router-dom";
import EditProductForm from "../../../forms/adminForm/EditProductForm";

const AddProduct = () => {
  const {id} = useParams()
  return (
    <div>
      <BreedCrumb />
      <div>
        <h1 className="text-xl font-semibold">{id ? 'Edit Product' :'Add New Product'}</h1>
      </div>
      {id ? <EditProductForm />: <AddProductForm />}
      
    </div>
  );
};

export default AddProduct;

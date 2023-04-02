import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utils/data/firebase";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import Select from "react-select";
import { customStyles } from "../../styles/Style";
import { IBranchAddProductForm } from "../../types/Product";
import { useHome } from "../../context/HomeContext";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditProductId: React.Dispatch<React.SetStateAction<string | null>>;
  editProductId: string | null;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductForm: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  setEditProductId,
  editProductId,
  setStateChange,
}) => {
  const [products, setProducts] = useState<Array<any>>([]);
  const { user, token } = useAuth();
  const { isAmh, setMessageType } = useHome();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //validation for the add product form
  const productValidationSchema = Yup.object().shape({
    quantity: Yup.number().required("available quantity is required"),
    product: Yup.string().required("available quantity is required"),
  });

  const initialValues: IBranchAddProductForm = {
    product: "",
    quantity: undefined,
  };

  //fetch products
  const productData = useQuery(
    ["branchProductsData"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}product/branches`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res: any) => {
        setProducts(res?.data?.data);
      },
    }
  );

  //post request
  const createProductMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}store/create`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const addProductMutationHandler = async (values: IBranchAddProductForm) => {
    try {
      createProductMutation.mutate(
        {
          product: values.product,
          availableQuantity: values.quantity,
          branch: user.branch,
        },
        {
          onSuccess: (responseData: any) => {
            setMessageType({
              message: "Product added Successfully!",
              type: "SUCCESS",
            });
            setStateChange((prev) => !prev);
            setIsModalOpen(false);
          },
          onError: (err: any) => {
            setMessageType({
              message: err?.response?.data?.message,
              type: "ERROR",
            });
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-2 pb-52 pt-6">
      <h1 className="font-semibold text-xl text-dark-gray">
        {editProductId ? "Edit Product" : "Add Product"}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={productValidationSchema}
        onSubmit={addProductMutationHandler}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          handleChange,
        }) => (
          <Form className="w-full flex flex-col items-center space-y-2">
            {/* products */}
            <div className="w-full">
              <Select
                isSearchable={true}
                styles={customStyles}
                placeholder={"select product"}
                onChange={(selectedOption: any) => {
                  handleChange("product")(selectedOption._id);
                  // setFieldValue("amenities", selectedOption);
                }}
                getOptionLabel={(categories: any) => categories.name}
                getOptionValue={(categories: any) => categories._id}
                className="w-full font-semibold"
                options={products}
                name="products"
                isLoading={false}
                noOptionsMessage={() => "products appears here!"}
              />
              {errors.product && touched.product ? (
                <p className="text-[13px] text-red-500">{errors.product}</p>
              ) : null}
            </div>
            <div className="w-full">
              <Field
                as="input"
                type={"number"}
                name="quantity"
                placeholder="quantity"
                className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                  errors.quantity && touched.quantity
                    ? "border border-red-600"
                    : "border border-gray-300  "
                }`}
              />
              {errors.quantity && touched.quantity ? (
                <p className="text-[13px] text-red-500">{errors.quantity}</p>
              ) : null}
            </div>

            <button
              disabled={createProductMutation.isLoading}
              type="submit"
              className="w-full bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-5"
            >
              {createProductMutation.isLoading ? "Loading..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-dark-gray font-medium text-justify">
        {isAmh
          ? "ለቅርንጫፍዎ የሚገኘውን የምርት መጠን ለመጨመር ወይም ለመቀነስ አዲስ ምርት ማከል ወይም ምርቱን ማዘመን ይችላሉ::"
          : "you can add new product or update the product to increse or decrese the available quantity of the product that is available to your branch."}
      </p>
    </div>
  );
};

export default AddProductForm;

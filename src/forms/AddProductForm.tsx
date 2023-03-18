import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/data/firebase";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductFormProps {
  name: string;
  nameAm: string;
  description: string;
  image: Array<string>;
  price: string;
}
const AddProductForm = () => {
  const productValidationSchema = Yup.object().shape({
    name: Yup.string().required("product name is required!"),
    nameAm: Yup.string().required("product amharic name is required!"),
    description: Yup.string().required("product description is required!"),
    image: Yup.array().min(1).required("at least one image is required."),
    price: Yup.number().required("product name is required!"),
  });

  const initialValues: ProductFormProps = {
    name: "",
    nameAm: "",
    description: "",
    image: [],
    price: "",
  };

  return (
    <div className="py-5">
      <Formik
        initialValues={initialValues}
        onSubmit={(val) => console.log(val)}
        validationSchema={productValidationSchema}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form className="flex flex-col items-start space-y-1 w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <div className="w-full">
                <Field
                  as={"input"}
                  name="name"
                  placeholder="Product AmharicName"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.name && touched.name
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.name && touched.name ? (
                  <p className="text-[13px] text-red-500">{errors.name}</p>
                ) : null}
              </div>
              {/* amharic name */}
              <div className="w-full">
                <Field
                  as={"input"}
                  name="nameAm"
                  placeholder="Product Name"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.nameAm && touched.nameAm
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.nameAm && touched.nameAm ? (
                  <p className="text-[13px] text-red-500">{errors.nameAm}</p>
                ) : null}
              </div>
            </div>

            <div className="flex items-end justify-end w-full">
            <button
              type="submit"
              className=" bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-10"
            >
              Create
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;

import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { StylesConfig } from "react-select";
import Dropzone from "react-dropzone";
import { MdDelete } from "react-icons/md";
import upload from "../../assets/upload.jpg";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../../styles/Style";
import { useHome } from "../../context/HomeContext";
import { ICouponFormProps } from "../../types/Coupon";

const AddCouponForm = () => {
  const navigate = useNavigate();
  const { setMessageType } = useHome();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ICouponFormProps>();
  const [category, setCategory] = useState<Array<any>>([]);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<any>>([]);
  const couponValidationSchema = Yup.object().shape({
    code: Yup.string().required("coupon code is required!"),
    discount: Yup.number().required("discount is required!"),
    description: Yup.string().required("coupon  description is required!"),
    expiresAt: Yup.date().required("coupon expiry expiresAt is required."),
    enabled: Yup.boolean().required("coupon automatically active required!"),
    discountType: Yup.string().required("discountType   is required!"),
  });

  const initialValues: ICouponFormProps = {
    code: "",
    discount: "",
    description: "",
    expiresAt: "",
    enabled: false,
    discountType: "",
  };

  const discountTypeOption = [
    { value: "PERCENT", label: "PERCENT" },
    { value: "FIXED", label: "FIXED" },
  ];
  //fetch categories
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const createCouponMutation = useMutation(
    async (data: any) =>
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}coupon/create`,
        data,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );
  const createCouponMutationHandler = async (values: ICouponFormProps) => {
    try {
      createCouponMutation.mutate(
        {
          code: values.code,
          discount: Number(values.discount),
          discountType: values.discountType,
          description: values.description,
          expiresAt: values.expiresAt,
          enabled: values.enabled,
        },
        {
          onSuccess: (res: any) => {
            navigate("/coupon");
            setMessageType({
              message: "Coupon Created Successfully!",
              type: "SUCCESS",
            });
          },
          onError: (err:any) => {
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
    <div className="py-5">
      <Formik
        initialValues={initialValues}
        onSubmit={createCouponMutationHandler}
        validationSchema={couponValidationSchema}
      >
        {({ values, setFieldValue, touched, errors, handleChange }) => (
          <Form className="flex flex-col items-start space-y-2 w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              <div className="w-full">
                <Field
                  as={"input"}
                  name="code"
                  placeholder="coupon code"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.code && touched.code
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.code && touched.code ? (
                  <p className="text-[13px] text-red-500">{errors.code}</p>
                ) : null}
              </div>
              {/* date */}
              <div className="w-full">
                <Field
                  type={"date"}
                  name="expiresAt"
                  placeholder="coupon expiration date"
                  className={`rounded-sm w-full focus:outline-none  p-2 text-dark-gray  ${
                    errors.expiresAt && touched.expiresAt
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.expiresAt && touched.expiresAt ? (
                  <p className="text-[13px] text-red-500">{errors.expiresAt}</p>
                ) : null}
              </div>
            </div>
            {/* discount and its type */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-3 w-full">
              <div className="w-full">
                <Field
                  type={"number"}
                  as={"input"}
                  name="discount"
                  placeholder="coupon discount"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.discount && touched.discount
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.discount && touched.discount ? (
                  <p className="text-[13px] text-red-500">{errors.discount}</p>
                ) : null}
              </div>
              {/* type */}
              <div className="w-full flex flex-col items-start space-y-1">
                <Select
                  options={discountTypeOption}
                  isSearchable={false}
                  placeholder={"select coupon discount type"}
                  styles={customStyles}
                  name="discountType"
                  getOptionLabel={(priceOption: any) => priceOption.label}
                  getOptionValue={(priceOption: any) => priceOption.value}
                  onChange={(selectedOption: any) => {
                    handleChange("discountType")(selectedOption.value);
                  }}
                  className="w-full font-semibold"
                  isLoading={false}
                  noOptionsMessage={() => "discountType appears here"}
                />
                {errors.discountType && touched.discountType ? (
                  <p className="text-[13px] font-medium capitalize text-red-500">
                    {errors.discountType}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 w-full">
              {/* description */}
              <div className="w-full">
                <Field
                  as={"textarea"}
                  name="description"
                  placeholder="coupon description"
                  className={`rounded-sm w-full h-28 focus:outline-none  p-2 text-dark-gray  ${
                    errors.description && touched.description
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.description && touched.description ? (
                  <p className="text-[13px] text-red-500">
                    {errors.description}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <div>
                <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    name="enabled"
                    type="checkbox"
                    className="h-5 w-5 text-blue-500 rounded transition duration-200 ease-in-out"
                    checked={values.enabled}
                    onChange={(e) => setFieldValue("enabled", e.target.checked)}
                  />
                  <span className="text-gray-700">
                    {values.enabled ? "Enable" : "Disable"}
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-end justify-end w-full">
              <button
                disabled={createCouponMutation.isLoading}
                type="submit"
                className=" bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-10"
              >
                {createCouponMutation.isLoading ? "Loading" : "Create"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCouponForm;

import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import ReactLoading from "react-loading";
import app from "../../utils/data/firebase";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import Select from "react-select";
import { customStyles, mainColor } from "../../styles/Style";
import { IBranchAddProductForm } from "../../types/Product";
import { useHome } from "../../context/HomeContext";
import { useNavigate } from "react-router-dom";

const NewProductRequestForm = () => {
    const navigate = useNavigate()
  const { token, user } = useAuth();
  const { isAmh, setMessageType } = useHome();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //validation for the add product form
  const requestValidationSchema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number().required("product quantity  is required"),
        product: Yup.string().required("product  is required"),
      })
    ),
    deliveredDate: Yup.date()
      .min(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        "Date must be tomorrow or later"
      )
      .required("delivered date is required"),
  });
  const initialValues = {
    products: [{ quantity: undefined, product: "" }],
    deliveredDate: "",
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
      onSuccess: (res: any) => {},
    }
  );

  //post request
  const requestProductMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}productRequest/send`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const productRequestMutationHandler = async (values: any) => {
    try {
      requestProductMutation.mutate(
        {
          product: values.products,
          deliveredDate: values.deliveredDate,
          branch: user.branch,
        },
        {
          onSuccess: (responseData: any) => {
            setMessageType({
              message: "request send Successfully!",
              type: "SUCCESS",
            });
            navigate(-1)
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
    <div>
      {productData.isFetched && productData.isSuccess ? (
        <Formik
          initialValues={initialValues}
          validationSchema={requestValidationSchema}
          onSubmit={productRequestMutationHandler}
        >
          {({ values, setFieldValue, setFieldTouched }) => (
            <Form className="bg-white p-2 rounded-md flex w-full flex-col items-start space-y-2">
              <FieldArray name="products">
                {({ push, remove }) => (
                  <div className="flex flex-col items-start space-y-2 w-full">
                    {values.products.map((product, index) => (
                      <div key={index} className="w-full">
                        <div className="flex items-center gap-2 w-full">
                          {" "}
                          <div className="w-full">
                            <Select
                              isSearchable={true}
                              styles={customStyles}
                              placeholder={"select product"}
                              onChange={(selectedOption: any) => {
                                setFieldValue(
                                  `products.${index}.product`,
                                  selectedOption._id
                                );
                              }}
                              onBlur={() =>
                                setFieldTouched(
                                  `products.${index}.product`,
                                  true,
                                  true
                                )
                              }
                              getOptionLabel={(categories: any) =>
                                categories.name
                              }
                              getOptionValue={(categories: any) =>
                                categories._id
                              }
                              className="w-full font-semibold"
                              options={productData?.data?.data?.data}
                              name="products"
                              isLoading={false}
                              noOptionsMessage={() => "products appears here!"}
                            />
                            <ErrorMessage
                              name={`products.${index}.product`}
                              component={"div"}
                              className="text-[13px] text-red-500"
                            />
                          </div>
                          <div className="w-full">
                            <Field
                              as="input"
                              type={"number"}
                              name={`products.${index}.quantity`}
                              placeholder="quantity"
                              className={`p-2 w-full  focus:ring-2 ring-blue-500 rounded-sm border border-gray-300 focus:outline-none ring-0`}
                            />
                            <ErrorMessage
                              name={`products.${index}.quantity`}
                              component={"div"}
                              className="text-[13px] text-red-500"
                            />
                          </div>
                          {index > 0 && (
                            <div className=" flex items-end justify-end">
                              <button
                                className={
                                  "w-fit bg-red-500 text-white font-medium p-2"
                                }
                                type="button"
                                data-qa="remove"
                                onClick={() => remove(index)}
                              >
                                {isAmh ? "ቀንስ" : "Remove"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className=" flex items-end justify-end pt-3">
                      <button
                        className={
                          "w-fit bg-green-500 text-white p-2 px-5 rounded-md font-medium"
                        }
                        type="button"
                        onClick={() =>
                          push({ quantity: undefined, product: "" })
                        }
                      >
                        {isAmh ? "ቀንስ" : "Add Product"}
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <div className="w-full flex flex-col items-start space-y-1 ">
                <p>delivered date</p>
                <Field
                  as="input"
                  type={"date"}
                  name={`deliveredDate`}
                  placeholder="quantity"
                  className={`p-2 w-full  focus:ring-2 ring-blue-500 rounded-sm border border-gray-300 focus:outline-none ring-0`}
                />
                <ErrorMessage
                  name={`deliveredDate`}
                  component={"div"}
                  className="text-[13px] text-red-500"
                />
              </div>

              <div className="flex items-end justify-end self-end w-full pt-3">
                <button
                  disabled={requestProductMutation.isLoading}
                  type="submit"
                  className="w-fit bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-5"
                >
                  {requestProductMutation.isLoading ? "Loading..." : "send"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
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
    </div>
  );
};

export default NewProductRequestForm;

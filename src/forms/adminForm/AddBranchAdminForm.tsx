import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IDeliveryMan } from "../../types/Delivery";
import { useHome } from "../../context/HomeContext";
import { PulseLoader } from "react-spinners";
import Select from "react-select";
import { IBranchAdmin } from "../../types/Branch";
import { customStyles } from "../../styles/Style";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddBranchAdminForm: React.FC<Props> = ({
  setIsModalOpen,
  setStateChange,
}) => {
  const { isAmh, setMessageType } = useHome();
  const { token } = useAuth();
  const [branches, setBranches] = useState<Array<any>>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  //fetch branches
  const branchesData = useQuery(
    ["branchesData"],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}branch`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res: any) => {
        setBranches(res?.data?.data);
      },
    }
  );
  const branchAdminSchema = Yup.object().shape({
    phone: Yup.number()
      .required("phone is required")
      .typeError("phone is required")
      .test("starts-with-9", "Number must start with 9", (value) =>
        value?.toString().startsWith("9")
      )
      .test(
        "total-length-9",
        "Number must have a total length of 9 digits",
        (value) => value?.toString().length === 9
      ),
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    email: Yup.string().email().required("email is required"),
    password: Yup.string().required("password is required"),
    branch: Yup.string().required("branch is required"),
  });

  const initialValues: IBranchAdmin = {
    phone:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    branch: "",
  };

  //create Branch admin post request
  const createBranchAdminMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }admin/branch-manager/create`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const createBranchAdminSubmitHandler = async (values:any) => {
    console.log(values)
    try {
      createBranchAdminMutation.mutate(
        {
          phone: Number("251".concat(values.phone)),
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          branch: values.branch,
          role: "STORE_ADMIN",
        },
        {
          onSuccess: (responseData: any) => {
            setMessageType({
              message: "Branch Admin added Successfully!",
              type: "SUCCESS",
            });
            setStateChange((prev)=>!prev);
            setIsModalOpen(false)
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
    <div className="">
      <h1 className="font-semibold text-dark-gray text-center pb-2">
        {isAmh ? "አዲስ አድራሽ ፍጠር" : "Add New Branch Admin"}
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={branchAdminSchema}
        onSubmit={createBranchAdminSubmitHandler}
      >
        {({ handleChange, values, errors, touched, setFieldValue }) => (
          <Form className="w-full flex flex-col items-center space-y-2">
            <div className="w-full">
              <div
                className={`rounded-sm flex items-center w-full h-full focus:outline-none   text-dark-gray  ${
                  errors.phone && touched.phone
                    ? "border border-red-600"
                    : "border border-gray-300  "
                }`}
              >
                <span className="border-r-2 border-gray-300 font-medium text-gray-700 px-2">
                  +251
                </span>
                <Field
                  as="input"
                  type={"tel"}
                  autoComplete="false"
                  name="phone"
                  placeholder="phone number"
                  className="focus:outline-none w-full h-full p-3 flex-grow"
                />
              </div>
              {errors.phone && touched.phone ? (
                <p className="text-[13px] text-red-500">{errors.phone}</p>
              ) : null}
            </div>
            {/* branch */}
            <div className="w-full">
              <Select
                isSearchable={false}
                styles={customStyles}
                placeholder={"select his branch"}
                onChange={(selectedOption: any) => {
                  // handleChange("products")(selectedOption._id);
                  setFieldValue("branch", selectedOption._id);
                }}
                getOptionLabel={(categories: any) => categories.name}
                getOptionValue={(categories: any) => categories._id}
                className="w-full font-semibold"
                options={branches}
                name="branch"
                isLoading={false}
                noOptionsMessage={() => "branchs appears here"}
              />
              {errors.branch && touched.branch ? (
                <p className="text-[13px] text-red-500">{errors.branch}</p>
              ) : null}
            </div>
            {/*  */}
            <div className="grid grid-cols-2 gap-3">
              <div className="w-full">
                <Field
                  as="input"
                  name="firstName"
                  placeholder="firstName"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.firstName && touched.firstName
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="text-[13px] text-red-500">{errors.firstName}</p>
                ) : null}
              </div>
              {/* lastname */}
              <div className="w-full">
                <Field
                  as="input"
                  name="lastName"
                  placeholder="lastName"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.lastName && touched.lastName
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.lastName && touched.lastName ? (
                  <p className="text-[13px] text-red-500">{errors.lastName}</p>
                ) : null}
              </div>
            </div>
            {/* email */}
            <div className="w-full">
              <Field
                as="input"
                name="email"
                autoComplete="false"
                placeholder="Email"
                className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                  errors.email && touched.email
                    ? "border border-red-600"
                    : "border border-gray-300  "
                }`}
              />
              {errors.email && touched.email ? (
                <p className="text-[13px] text-red-500">{errors.email}</p>
              ) : null}
            </div>
            {/* password */}
            <div className="w-full">
              <div
                className={`rounded-sm flex items-center w-full h-full focus:outline-none   text-dark-gray  ${
                  errors.password && touched.password
                    ? "border border-red-600"
                    : "border border-gray-300  "
                }`}
              >
                <Field
                  as="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="false"
                  placeholder="Password"
                  className="focus:outline-none w-full h-full p-3 flex-grow"
                />
                <div
                  className="px-2 h-fit cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={22} color="#aeaeae" />
                  ) : (
                    <AiFillEye size={22} color="#aeaeae" />
                  )}
                </div>
              </div>
              {errors.password && touched.password ? (
                <p className="text-[13px] text-red-500">{errors.password}</p>
              ) : null}
            </div>

            <button
              disabled={createBranchAdminMutation.isLoading}
              type="submit"
              className=" rounded-sm  bg-main-bg p-3 text-[15px] text-white font-medium
                   hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
            >
              {createBranchAdminMutation.isLoading ? (
                <PulseLoader color="#fff" />
              ) : isAmh ? (
                "ጨምር"
              ) : (
                "Create"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBranchAdminForm;

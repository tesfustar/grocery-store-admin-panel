import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { IBranch } from "../../types/Branch";
import { FaMapMarkerAlt } from "react-icons/fa";
import GoogleMapReact from "google-map-react";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddBranchForm: React.FC<Props> = ({ setIsModalOpen, setStateChange }) => {
  const [latitude, setLatitude] = useState(null);
  const [longtude, setLongtude] = useState(null);
  const { token } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const defaultProps = {
    center: {
      lat: 9.013857199050697,
      lng: 38.753744567168226,
    },
    zoom: 11,
  };
  //validation for the add branch form
  const branchValidationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    location: Yup.array().required("location is required"),
    lat: Yup.number()
      .min(-90, "Latitude must be greater than or equal to -90")
      .max(90, "Latitude must be less than or equal to 90")
      .required("Latitude is required"),
    lng: Yup.number()
      .min(-180, "Longitude must be greater than or equal to -180")
      .max(180, "Longitude must be less than or equal to 180")
      .required("Longitude is required"),
  });

  const initialValues: IBranch = {
    name: "",
    location: [],
    lat: undefined,
    lng: undefined,
  };

  function MapView(){
    return(
        <FaMapMarkerAlt size={30} className="text-main-color" />
    )
  }
  return (
    <div className="flex flex-col items-center space-y-2">
      <h1 className="font-semibold text-xl text-dark-gray">
        {/* {editBannerId ? "Edit Category" : "Add Category"} */}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={branchValidationSchema}
        onSubmit={(val) => console.log(val)}
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
            <div className="w-full">
              <Field
                as="input"
                name="name"
                placeholder="name"
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
            {/* location */}
            <div className="h-72  w-full rounded-lg">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={10}
                onClick={(e) => {
                  setFieldValue("lat", e.lat);
                  setFieldValue("lng", e.lng);
                  console.log(e);
                }}
                margin={[50, 50, 50, 50]}
              >
                {values.lat && values.lng && (
                //   <div lat={values.lat} lng={values.lng}>
                //     <FaMapMarkerAlt size={30} className="text-main-color" />
                //   </div>
                <MapView />
                )}
              </GoogleMapReact>
            </div>
              {errors.lat && touched.lat ? (
                <p className="text-[13px] text-red-500">{errors.lat}</p>
              ) : null}
            <button
              // disabled={
              //   isUploading ||
              //   createCategoryMutation.isLoading ||
              //   editCategoryMutation.isLoading
              // }
              type="submit"
              className="w-full bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
          text-white font-medium p-3 px-5"
            >
              {/* {isUploading ||
          createCategoryMutation.isLoading ||
          editCategoryMutation.isLoading
            ? "Loading..."
            : editCategoryId
            ? "Edit"
            : "Create"} */}
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBranchForm;

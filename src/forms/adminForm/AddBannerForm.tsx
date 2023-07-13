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
interface BannerFormProps {
  name: string;
  description: string;
  products: string[] | null;
  image: object | null;
}
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditBannerId: React.Dispatch<React.SetStateAction<string | null>>;
  editBannerId: string | null;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBannerForm: React.FC<Props> = ({ setIsModalOpen, editBannerId ,setStateChange}) => {
  const [products, setProducts] = useState<Array<any>>([]);
  const { token } = useAuth();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //validation for the add banner form
  const bannerValidationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("name is required"),
    products: Yup.array().optional(),
    image: Yup.mixed().nullable().required("image is required"),
  });

  const initialValues: BannerFormProps = {
    name: "",
    description: "",
    products: [],
    image: null,
  };

  //firebase image upload
  const uploadImage = (values: any) => {
    setIsUploading(true);
    const fileName = new Date().getTime() + values.image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, values.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          createBannerMutationHandler({
            values,
            image: downloadURL,
          });
        });
      }
    );
  };
  const createBannerMutation = useMutation(
    async ({ name, nameAm, image }: any) =>
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}banner/create`,
        { name, nameAm, image },
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );
  //create banner mutation post request
  const createBannerMutationHandler = async ({
    values,
    image,
  }: {
    values: any;
    image: any;
  }) => {
    try {
      createBannerMutation.mutate(
        {
          name: values.name,
          image,
        },
        {
          onSuccess: (responseData) => {
            setIsModalOpen(false);
            setStateChange((prev) => !prev);
          },
          onError: (err) => {},
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center space-y-2">
      <h1 className="font-semibold text-xl text-dark-gray">
        {editBannerId ? "Edit Ads banner" : "Add Ads banner"}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={bannerValidationSchema}
        onSubmit={(val) => uploadImage(val)}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          handleChange,
        }) => {
           console.log(errors)
          return(
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
            {/* products */}
            {/* <div className="w-full">
              <Select
                isMulti={true}
                isSearchable={false}
                styles={customStyles}
                placeholder={"select product"}
                onChange={(selectedOption: any) => {
                  // handleChange("products")(selectedOption._id);
                  setFieldValue("amenities", selectedOption);
                }}
                getOptionLabel={(categories: any) => categories.name}
                getOptionValue={(categories: any) => categories._id}
                className="w-full font-semibold"
                options={products}
                name="products"
                isLoading={false}
                noOptionsMessage={() => "products appears here"}
              />
              {errors.products && touched.products ? (
                <p className="text-[13px] text-red-500">{errors.products}</p>
              ) : null}
            </div> */}
            <div className="w-full">
              <Field
                as="input"
                name="description"
                placeholder="description"
                className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                  errors.description && touched.description
                    ? "border border-red-600"
                    : "border border-gray-300  "
                }`}
              />
              {errors.description && touched.description ? (
                <p className="text-[13px] text-red-500">{errors.description}</p>
              ) : null}
            </div>
            {/* image icon */}
            <div className="w-full pb-3">
              <input
                // as={"input"}
                name="image"
                type="file"
                className={`rounded-sm w-full p-2 focus:outline-none  ${
                  errors.image && touched.image
                    ? "border border-red-600"
                    : "border border-gray-300  "
                }`}
                onChange={(event) => {
                  setTouched({
                    image: true,
                  });
                  setFieldValue("image", event.target.files?.[0] ?? null);
                }}
              />
              {errors.image && touched.image ? (
                <p className="text-[13px] text-red-500">{errors.image}</p>
              ) : null}
            </div>
            <button
              disabled={
                isUploading ||
                createBannerMutation.isLoading 
              }
              type="submit"
              className="w-full bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
            text-white font-medium p-3 px-5"
            >
              {isUploading ||
            createBannerMutation.isLoading
              ? "Loading..."
              : "Create"}
            </button>
          </Form>
        )}}
      </Formik>
    </div>
  );
};

export default AddBannerForm;

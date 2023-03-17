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
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  editCategoryId: string | null;
  setStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryFormProps {
  name: string;
  nameAm: string;
  image: object | null;
}
interface ValueProps {
  values: {
    name: string;
    nameAm: string;
  };
  image: string;
}
const AddCategoryForm = ({
  setIsModalOpen,
  isModalOpen,
  editCategoryId,
  setEditCategoryId,
  setStateChange,
}: Props) => {
  const { token } = useAuth();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //validation for the add category form
  const categoryValidationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    nameAm: Yup.string().required("amharic name is required"),
    image: Yup.mixed().nullable().required("image is required"),
  });

  const initialValues: CategoryFormProps = {
    name: "",
    nameAm: "",
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
          if (editCategoryId) {
            editCategoryMutationHandler({
              values,
              image: downloadURL,
            });
          } else {
            createCategoryMutationHandler({
              values,
              image: downloadURL,
            });
          }
        });
      }
    );
  };

  //mutations
  const editCategoryMutation = useMutation(
    async ({ name, nameAm, image }: any) =>
      await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }category/find/${editCategoryId}`,
        { name, nameAm, image },
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );
  const createCategoryMutation = useMutation(
    async ({ name, nameAm, image }: any) =>
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}category/create`,
        { name, nameAm, image },
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );
  //create category mutation post request
  const createCategoryMutationHandler = async ({
    values,
    image,
  }: {
    values: any;
    image: any;
  }) => {
    try {
      createCategoryMutation.mutate(
        {
          name: values.name,
          nameAm: values.nameAm,
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

  //update category
  const editCategoryMutationHandler = async ({
    values,
    image,
  }: {
    values: any;
    image: any;
  }) => {
    try {
      editCategoryMutation.mutate(
        {
          name: values.name,
          nameAm: values.nameAm,
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
        {editCategoryId ? "Edit Category" : "Add Category"}
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={(val) => uploadImage(val)}
      >
        {({ values, errors, touched, setFieldValue, setTouched }) => (
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
            <div className="w-full">
              <Field
                as="input"
                name="nameAm"
                placeholder="amharic name"
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
                createCategoryMutation.isLoading ||
                editCategoryMutation.isLoading
              }
              type="submit"
              className="w-full bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-5"
            >
              {isUploading ||
              createCategoryMutation.isLoading ||
              editCategoryMutation.isLoading
                ? "Loading..."
                : editCategoryId
                ? "Edit"
                : "Create"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        transition={Zoom}
        limit={1}
      />
    </div>
  );
};

export default AddCategoryForm;

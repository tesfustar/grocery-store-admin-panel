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
import { IProductFormProps } from "../../types/Product";
import { useHome } from "../../context/HomeContext";

const AddProductForm = () => {
  const navigate = useNavigate();
  const {setMessageType} = useHome()
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IProductFormProps>();
  const [category, setCategory] = useState<Array<any>>([]);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<any>>([]);
  const productValidationSchema = Yup.object().shape({
    category: Yup.string().required("category name is required!"),
    name: Yup.string().required("product name is required!"),
    nameAm: Yup.string().required("product amharic name is required!"),
    description: Yup.string().required("product  description is required!"),
    descriptionAm: Yup.string().required(
      "product amharic description is required!"
    ),
    image: Yup.array().min(1).required("at least one image is required."),
    price: Yup.number().required("product name is required!"),
    priceType: Yup.string().required("price type  is required!"),
  });

  const initialValues: IProductFormProps = {
    category: "",
    name: "",
    nameAm: "",
    description: "",
    descriptionAm: "",
    image: [],
    price: "",
    priceType:""
  };


  const priceOptions = [
    { value: "piece", label: "per piece" },
    { value: "kg", label: "per kilogram" },
  ];
  //fetch categories
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch categories
  const categoryData = useQuery(
    ["categoryData"],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}category`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setCategory(res?.data?.data);
      },
    }
  );


  const createProduct = (values: IProductFormProps) => {
    setIsLoading(true);
    const promises: any = [];
    values?.image.map((file) => {
      const storage = getStorage(app);
      const storageRef = ref(storage, `files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
            setImageUrls((prevState) => [...prevState, downloadURLs]);
            console.log("File available at", downloadURLs);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        // setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (imageUrls.length > 0 && imageUrls.length === images?.length) {
      createProductMutationHandler();
    }
  }, [imageUrls]);

  const createProductMutation = useMutation(
    async (data: any) =>
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}product/create`,
        data,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );
  const createProductMutationHandler = async () => {
    console.log({ formValues });
    try {
      createProductMutation.mutate(
        {
          category: formValues?.category,
          name: formValues?.name,
          nameAm: formValues?.nameAm,
          image: imageUrls,
          description: formValues?.description,
          descriptionAm: formValues?.descriptionAm,
          price: formValues?.price,
          priceType:formValues?.priceType
        },
        {
          onSuccess: (res: any) => {
            navigate("/products");
            setMessageType({ message: "Product Created Successfully!", type: "SUCCESS" });
          },
          onError: (err) => {},
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
        onSubmit={(val) => {
          createProduct(val);
          setFormValues(val);
        }}
        validationSchema={productValidationSchema}
      >
        {({ values, setFieldValue, touched, errors, handleChange }) => (
          <Form className="flex flex-col items-start space-y-2 w-full ">
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
            {/* price and category an type */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              <div className="w-full">
                <Field
                  type={"number"}
                  as={"input"}
                  name="price"
                  placeholder="Product Price"
                  className={`rounded-sm w-full  focus:outline-none  p-2 text-dark-gray  ${
                    errors.price && touched.price
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.price && touched.price ? (
                  <p className="text-[13px] text-red-500">{errors.price}</p>
                ) : null}
              </div>
              {/* type */}
              <div className="w-full flex flex-col items-start space-y-1">
                    <Select
                      options={priceOptions}
                      isSearchable={false}
                      placeholder={"select price type"}
                      styles={customStyles}
                      name="priceType"
                      getOptionLabel={(priceOption:any) => priceOption.label}
                      getOptionValue={(priceOption:any) => priceOption.value}
                      onChange={(selectedOption:any) => {
                        handleChange("priceType")(selectedOption.value);
                      }}
                      className="w-full font-semibold"
                      isLoading={false}
                      noOptionsMessage={() => "priceType appears here"}
                    />
                     {errors.priceType && touched.priceType ? (
                <p className="text-[13px] font-medium capitalize text-red-500">
                  {errors.priceType}
                </p>
              ) : null}
                  </div>
              {/* category */}
              <div className="w-full">
                <Select
                  isSearchable={false}
                  styles={customStyles}
                  placeholder={"select category"}
                  onChange={(selectedOption: any) => {
                    handleChange("category")(selectedOption._id);
                  }}
                  getOptionLabel={(categories: any) => categories.name}
                  getOptionValue={(categories: any) => categories._id}
                  className="w-full font-semibold"
                  options={category}
                  name="category"
                  isLoading={false}
                  noOptionsMessage={() => "category appears here"}
                />
                {errors.category && touched.category ? (
                  <p className="text-[13px] text-red-500">{errors.category}</p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {/* description */}
              <div className="w-full">
                <Field
                  as={"textarea"}
                  name="description"
                  placeholder="Product Description"
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
              {/* discription amh */}
              <div className="w-full">
                <Field
                  as={"textarea"}
                  name="descriptionAm"
                  placeholder="Amharic Product Description"
                  className={`rounded-sm w-full h-28 focus:outline-none  p-2 text-dark-gray  ${
                    errors.descriptionAm && touched.descriptionAm
                      ? "border border-red-600"
                      : "border border-gray-300  "
                  }`}
                />
                {errors.descriptionAm && touched.descriptionAm ? (
                  <p className="text-[13px] text-red-500">
                    {errors.descriptionAm}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="w-full">
              {/* product image */}
              <Dropzone
                // style={dropzoneStyle}
                // accept="image/*"
                onDrop={(acceptedFiles) => {
                  // do nothing if no files
                  if (acceptedFiles.length === 0) {
                    return;
                  }

                  // on drop we add to the existing files
                  setFieldValue("image", values.image.concat(acceptedFiles));
                  const imageArray = acceptedFiles.map((item) =>
                    URL.createObjectURL(item)
                  );
                  setImages((prevImages) => prevImages.concat(imageArray));
                }}
              >
                {({
                  isDragActive,
                  isDragReject,
                  acceptedFiles,
                  getRootProps,
                  getInputProps,
                }) => (
                  <section className="w-full flex flex-col items-start space-y-2">
                    <div
                      {...getRootProps()}
                      className={`border-2 ${
                        errors.image && touched.image
                          ? "border-red-500"
                          : "border-gray-300"
                      }  border-dashed rounded-md cursor-pointer
                      w-full p-12 flex flex-col md:flex-row items-center space-x-3 justify-center bg-white`}
                    >
                      <input {...getInputProps()} />
                      <img src={upload} alt="" className="h-36" />
                      <div>
                        <h2 className="font-semibold text-xl text-dark-gray dark:text-gray-300">
                          Drop or Select Product Images
                        </h2>
                        <p className="font-bold text-sm text-dark-gray dark:text-gray-400">
                          Drag 'n' drop some Images here, or click to select
                          Images
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center flex-wrap ">
                      {images?.map((img, i) => (
                        <div key={i} className="relative pl-1 pb-1">
                          <img
                            src={img}
                            alt=""
                            className="h-24 w-28 object-cover rounded-md "
                          />
                          <button
                            className="bg-white rounded-l-lg p-1 text-sm text-white
                             absolute top-3 right-0"
                            onClick={() => {
                              setImages(images.filter((e) => e !== img));
                              setFieldValue(
                                "image",
                                images.filter((e) => e !== img)
                              );
                            }}
                          >
                            <MdDelete size={20} className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </Dropzone>
              {errors.image && touched.image ? (
                <p className="text-[13px] text-red-500">
                  {typeof errors.image === "string" && errors.image}
                </p>
              ) : null}
            </div>
            <div className="flex items-end justify-end w-full">
              <button
                disabled={createProductMutation.isLoading || isLoading}
                type="submit"
                className=" bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-10"
              >
                {createProductMutation.isLoading || isLoading
                  ? "Loading"
                  : "Create"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;

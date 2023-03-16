import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
  editCategoryId: string | null;
}

interface CategoryFormProps {
  name: string;
  nameAm: string;
  image: object | null;
}
const AddCategoryForm = ({
  setIsModalOpen,
  isModalOpen,
  editCategoryId,
  setEditCategoryId,
}: Props) => {
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
  return (
    <div className="flex flex-col items-center space-y-2">
      <h1 className="font-semibold text-xl text-dark-gray">{editCategoryId ? "Edit Category" : "Add Category"}</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={(val) => console.log(val)}
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
                // onChange={(event) => {
                //   setTouched({
                //     touched,
                //     image: true,
                //   });
                //   setFieldValue("image", event.target.files[0]);
                // }}
              />
              {errors.image && touched.image ? (
                <p className="text-[13px] text-red-500">{errors.image}</p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-main-bg rounded-sm hover:bg-main-bg/70 flex items-center justify-center 
              text-white font-medium p-3 px-5"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategoryForm;

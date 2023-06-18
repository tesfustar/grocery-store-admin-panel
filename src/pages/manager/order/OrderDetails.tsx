import React, { useState, FC, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, customStyles, mainColor } from "../../../styles/Style";
import { useNavigate, useParams } from "react-router-dom";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import Select from "react-select";
import { OrderStatus } from "../../../types/Order";
import { BsPrinter } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import "../../../styles/Printstyle.css";
import Logo from "../../../assets/Logo.png";
const OrderDetails = () => {
  const { id } = useParams();
  const { isAmh, setMessageType } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [isAssigning, setIsAssigning] = useState<boolean>(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  //print
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch order detail
  const orderDetailData = useQuery(
    [`totalOrdersData${id}`, stateChange, id],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}order/branch/detail/${id}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
    }
  );
  const deliveriesData = useQuery(
    [`totalOrdersData${id}`],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/deliveries`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
    }
  );

  //assign driver post request
  const assignDeliveryMutation = useMutation(
    async (newData: any) =>
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}order/admin/assign/${id}`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const assignDeliveryMutationHandler = async () => {
    try {
      assignDeliveryMutation.mutate(
        {
          deliveryId: selectedDriver,
        },
        {
          onSuccess: (responseData: any) => {
            setMessageType({
              message: "Driver Assigned Successfully!",
              type: "SUCCESS",
            });
            setStateChange((prev) => !prev);
            setIsAssigning(false);
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
  console.log(orderDetailData?.data?.data?.data);
  function ProductDetail() {
    return (
      <div className=" w-full flex flex-col space-y-2 flex-shrink-0 overflow-x-scroll scrollbar-hide">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ምርቶች " : "Products"}
        </h1>
        <table className="border-collapse flex-shrink-0 border border-gray-200 w-full ">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2 w-24 text-blue-color text-sm">
                Image
              </th>
              <th className="border border-gray-200 p-2 min-w-44 text-blue-color text-sm text-left">
                title
              </th>
              <th className="border border-gray-200 p-2 w-28 text-blue-color text-sm">
                price
              </th>
              <th className="border border-gray-200 p-2 w-24 text-blue-color text-sm">
                quantity
              </th>
              <th className="border border-gray-200 p-2 w-24 text-blue-color text-sm">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {orderDetailData?.data?.data?.data?.products?.map((item: any) => (
              <tr>
                <td className="border border-gray-300 p-3 w-24">
                  <img
                    src={item?.product?.image[0]}
                    alt=""
                    className="h-10 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-3 font-medium text-blue-color">
                  {isAmh ? item?.product?.name : item?.product?.nameAm}
                </td>
                <td className="border border-gray-300 p-3 text-enter font-medium text-blue-color  items-center">
                  {item?.product?.price}/ {item?.product?.priceType}
                </td>
                <td className="border border-gray-300 p-3 font-medium text-blue-color">
                  {item?.quantity}
                </td>
                <td className="border border-gray-300 p-3 font-medium text-blue-color">
                  {item?.quantity * item?.product?.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function TotalPrice() {
    return (
      <div className="max-w-xs flex flex-col items-end justify-end w-full self-end">
        <div className="w-full grid grid-cols-1  divide-y divide-blue-color/20 items-center justify-center">
          <div className="flex items-center justify-between p-3">
            <h3 className="font-semibold text-sm text-blue-color">
              Shipping Type:{" "}
            </h3>
            <p className="font-medium text-sm text-blue-color">
              {orderDetailData?.data?.data?.data?.shippingType}
            </p>
          </div>
          <div className="flex items-center justify-between p-3">
            <h3 className="font-semibold text-sm text-blue-color">
              payment Method{" "}
            </h3>
            <p className="font-medium text-sm text-blue-color">
              {orderDetailData?.data?.data?.data?.paymentMethod}
            </p>
          </div>
          <div className="flex items-center justify-between p-3">
            <h3 className="font-semibold text-sm text-blue-color">Status : </h3>
            <p className="font-medium text-sm text-main-color">
              {orderDetailData?.data?.data?.data?.status}
            </p>
          </div>
          <div className="flex items-center justify-between p-3">
            <h3 className="font-semibold text-sm text-blue-color">
              Total price :{" "}
            </h3>
            <p className="font-bold text-lg text-blue-color">
              ETB {orderDetailData?.data?.data?.data?.totalPrice}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const printStyles = {
    "@media print": {
      padding: "20mm" /* Adjust the padding value as per your requirements */,
    },
  } as React.CSSProperties;

  return (
    <div className="bg-white">
      <BreedCrumb />
      {orderDetailData.isFetched && orderDetailData.isSuccess ? (
        <div className="flex  flex-col space-y-3 w-full">
          <h1 className="border-b w-full border-gray-200 font-semibold text-blue-color text-lg pb-1">
            {isAmh ? "የትዕዛዝ ዝርዝሮች" : "Order Details"}
          </h1>
          {orderDetailData?.data?.data?.data?.status ===
            OrderStatus.PENDING && (
            <div>
              {isAssigning ? (
                <div className="flex items-center space-x-2  ">
                  <Select
                    options={deliveriesData?.data?.data?.data}
                    isSearchable={true}
                    styles={customStyles}
                    placeholder={"select delivery man"}
                    onChange={(selectedOption: any) => {
                      setSelectedDriver(selectedOption._id);
                    }}
                    getOptionLabel={(delivery: any) =>
                      delivery.firstName + " " + delivery.lastName
                    }
                    getOptionValue={(delivery: any) => delivery._id}
                    className="w-80 font-semibold"
                    isLoading={false}
                    noOptionsMessage={() => "deliveries appears here!"}
                  />
                  <button
                    disabled={
                      !selectedDriver || assignDeliveryMutation.isLoading
                    }
                    onClick={() => assignDeliveryMutationHandler()}
                    className="bg-green-500 px-5 p-2 text-white font-medium rounded-sm text-[15px] hover:bg-main-bg/70"
                  >
                    {assignDeliveryMutation.isLoading
                      ? "Assigning.."
                      : "Assign"}
                  </button>
                  <button
                    disabled={assignDeliveryMutation.isLoading}
                    onClick={() => setIsAssigning(false)}
                    className="bg-main-bg px-5 p-2 text-white font-medium rounded-sm text-[15px] hover:bg-main-bg/70"
                  >
                    cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAssigning(true)}
                  className="bg-main-bg p-2 text-white font-medium rounded-sm text-[15px] hover:bg-main-bg/70"
                >
                  Assign Delivery Boy
                </button>
              )}
            </div>
          )}
          <div ref={componentRef}>
            {/* header to be printed */}
            <div className="additional-content-hide  p-3  bg-gray-400/20">
              <div className="flex  items-center justify-between w-full pb-3">
                <img src={Logo} alt="" className="h-16" />
                <h3 className="font-bold  text-blue-colo text-5xl">INVOICE</h3>
              </div>
              <div className="flex  items-center justify-between  w-full">
                <div className="flex flex-col items-start space-y-2">
                  <h3 className="font-semibold text-sm text-blue-color">
                    Phone : Main Office number
                  </h3>
                  <h3 className="font-semibold text-sm text-blue-color">
                    email : Main Office email
                  </h3>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <h3 className="font-semibold text-sm text-blue-color">
                    order Id : #{id}
                  </h3>
                  <h3 className="font-semibold text-sm text-blue-color">
                    deliveryTime :{" "}
                    {orderDetailData?.data?.data?.data?.deliveryTime}
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-3" style={printStyles}>
              {/* header */}
              {/* info */}
              <div className="flex flex-col items-start space-y-2 py-10">
                <div className="flex items-center  space-x-2">
                  <h3 className="font-semibold text-sm text-blue-color">
                    Phone
                  </h3>
                  <p className="font-medium text-sm text-blue-color">
                    {orderDetailData?.data?.data?.data?.phoneNo}
                  </p>
                </div>
                <div className="flex items-center  space-x-5 ">
                  <h3 className="font-semibold text-sm text-blue-color">
                    Address
                  </h3>
                  <p className="font-medium text-sm text-blue-color">
                    {orderDetailData?.data?.data?.data?.address?.address}
                  </p>
                </div>
                <div className="flex items-center  space-x-5 ">
                  <h3 className="font-semibold text-sm text-blue-color">
                    deliveryTime
                  </h3>
                  <p className="font-medium text-sm text-blue-color">
                    {orderDetailData?.data?.data?.data?.deliveryTime}
                  </p>
                </div>
              </div>
              <ProductDetail />
              <TotalPrice />
            </div>
          </div>
          <div
            className="flex items-end justify-end p-5 md:p-10"
            onClick={handlePrint}
          >
            <BsPrinter
              size={40}
              className="bg-main-bg/40 p-2 rounded-md cursor-pointer"
            />
          </div>
        </div>
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

export default OrderDetails;

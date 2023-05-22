import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { useParams } from "react-router-dom";
import moment from "moment";

const RequestDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const { isAmh } = useHome();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //product request detail
  const requestDetailData = useQuery(
    ["requestDetailsData" + id, stateChange, id],
    async () =>
      await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }productRequest/detail/${id}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
      onError: (err) => {
        console.log(err);
      },
    }
  );

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
                {isAmh ? "የምርት ምስል" : "Image"}
              </th>
              <th className="border border-gray-200 p-2 min-w-44 text-blue-color text-sm text-left">
                {isAmh ? "የምርት ስም" : "product name"}
              </th>
              <th className="border border-gray-200 p-2 w-36 text-blue-color text-sm">
                {isAmh ? "የምርት ዋጋ" : "price"}
              </th>
              <th className="border border-gray-200 p-2 w-24 text-blue-color text-sm">
                {isAmh ? "የተጠየቀው መጠን" : "requested quantity"}
              </th>
              <th className="border border-gray-200 p-2 w-32 text-blue-color text-sm">
                {isAmh ? "የምርት ጠቅላላ ዋጋ" : "product total price"}
              </th>
            </tr>
          </thead>

          <tbody>
            {requestDetailData?.data?.data?.data?.product?.map((item: any) => (
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
                <td className="border border-gray-300 p-3 text-enter font-semibold text-main-color  items-center">
                  {item?.product?.price}/ {item?.product?.priceType}
                </td>
                <td className="border border-gray-300 p-3 font-medium text-blue-color">
                  {item?.quantity}
                </td>
                <td className="border border-gray-300 p-3 font-semibold text-main-color">
                  ETB {item?.product?.price * item?.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="p-3">
      {requestDetailData.isFetched && requestDetailData.isSuccess ? (
        <div>
          <div className="bg-white p-2">
            <ProductDetail />
            <div className="flex items-end justify-end">
              <div className="w-96 grid grid-cols-1  divide-y items-center justify-center">
                <div className="flex items-center justify-between p-3">
                  <h3 className="font-semibold text-sm text-blue-color">
                    {isAmh ? "ሁኔታ" : "Status"}
                  </h3>
                  <p className="font-semibold p-1 rounded-md text-sm text-red-color bg-red-bg/30">
                    {requestDetailData?.data?.data?.data?.status}
                  </p>
                </div>
                <div className="flex items-center justify-between p-3">
                  <h3 className="font-semibold text-sm text-blue-color">
                    {isAmh ? "የሚድርስበት ቀን" : "Date of delivery"}
                  </h3>
                  <p className="font-semibold text-sm text-main-color">
                    {" "}
                    {moment(
                      requestDetailData?.data?.data?.data?.deliveredDate
                    ).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                </div>
                <div className="flex items-center justify-between p-3">
                  <h3 className="font-semibold text-sm text-blue-color">
                    {isAmh
                      ? "የተጠየቀው ምርት ጠቅላላ ዋጋ"
                      : " requested product total price"}{" "}
                    :{" "}
                  </h3>
                  <p className="font-bold text-lg text-main-color">
                    ETB{" "}
                    {requestDetailData?.data?.data?.data?.product
                      ?.map(
                        (product: any) =>
                          product?.product?.price * product.quantity
                      )
                      ?.reduce(
                        (accumulator: number, currentValue: number) =>
                          accumulator + currentValue,
                        0
                      )}
                  </p>
                </div>
              </div>
            </div>
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

export default RequestDetail;

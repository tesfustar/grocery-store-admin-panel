import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { useParams } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";

import DeliveryOrderTable from "./components/DeliveryOrderTable";
const DeliveryDetail = () => {
  const { id } = useParams();
  const { isAmh } = useHome();
  const { token } = useAuth();
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const deliveryDetailData = useQuery(
    ["deliveryDetailDataApi", id],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/deliveries/${id}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setDeliveryOrders(
          res.data?.data?.orders?.map((data: object, index: number) => ({
            ...data,
            index: index + 1,
          }))
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  console.log(deliveryDetailData?.data?.data?.data?.counts);
  function CountData() {
    return (
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
          <div className="bg-[#457eac]/20 p-3 rounded-full">
            <BsFillCartCheckFill size={20} className="text-[#457eac]" />
          </div>
          <div className="flex flex-col items-start ">
            <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
              {isAmh ? "ምርቶች" : "Delivered Orders"}
            </h1>

            <h4 className="text-xl text-blue-color font-semibold">
              {
                deliveryDetailData?.data?.data?.data?.counts
                  ?.deliveredTotalOrders
              }
            </h4>
          </div>
        </div>
        {/* order */}
        <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
          <div className="bg-red-bg/20 p-3 rounded-full">
            <BsFillCartCheckFill size={20} className="text-red-color" />
          </div>
          <div className="flex flex-col items-start ">
            <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
              {isAmh ? "ጠቅላላ ትዕዛዞች" : "Canceled Orders"}
            </h1>

            <h4 className="text-xl text-blue-color font-semibold">
              {
                deliveryDetailData?.data?.data?.data?.counts
                  ?.canceledTotalOrders
              }
            </h4>
          </div>
        </div>
        {/* admins */}
        <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
          <div className="bg-[#7c3aed]/30 p-3 rounded-full">
            <BsFillCartCheckFill size={20} className="text-[#7c3aed]" />
          </div>
          <div className="flex flex-col items-start ">
            <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
              {isAmh ? "የቅርንጫፍ አስተዳዳሪዎች" : "Ongoing Orders"}
            </h1>

            <h4 className="text-xl text-blue-color font-semibold">
              {deliveryDetailData?.data?.data?.data?.counts?.onTheTotalOrders}
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BreedCrumb />
      {deliveryDetailData.isFetched && deliveryDetailData.isSuccess ? (
        <div className="flex flex-col items-start space-y-5 w-full">
          <CountData />
          {/* orders list */}
          <div className="w-full grid grid-cols-1  gap-3">
            <div className="bg-white p-2 w-full flex flex-col items-start space-y-2">
              <h2 className="text-[#8aa1ad] font-medium capitalize  pb-1">
                {isAmh ? "ምርቶች" : "Orders"}
              </h2>
              {deliveryDetailData?.data?.data?.data?.orders?.length > 0 ? (
                <DeliveryOrderTable deliveryOrders={deliveryOrders} />
              ) : (
                <h1 className="text-[#8aa1ad] font-medium capitalize text-xl py-5 text-center w-full">
                  {isAmh ? "ምንም የሚታዩ ምርቶች የሉም" : "No Orders to show!"}
                </h1>
              )}
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

export default DeliveryDetail;

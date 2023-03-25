import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../context/AuthContext";

import { useHome } from "../../context/HomeContext";
import { IDashboard } from "../../types/Dashboard";
import { Link } from "react-router-dom";
import {
  BsFillArrowRightSquareFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdDeliveryDining, MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { RiStoreFill } from "react-icons/ri";

const Dashboard = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const [dashboardCounts, setDashboardCounts] = useState<IDashboard>();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch dashboard counts
  const dashboardData = useQuery(
    ["dashboardData"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/dashboard`,
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
        setDashboardCounts(res?.data?.data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  console.log(dashboardCounts);
  return (
    <div>
      {dashboardData.isFetched && dashboardData.isSuccess ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* customers */}
          <div className="relative flex flex-col bg-white shadow-lg  rounded-lg">
            <div className="flex items-center justify-between p-5 pb-10">
              <div className="flex flex-col items-start space-y-2">
                <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
                  {isAmh ? "ደንበኞች" : "Customers"}
                </h1>
                {dashboardCounts?.customers}
              </div>
              <div className="h-24 w-24">
                <FaUserAlt size={80} className="text-main-color" />
              </div>
            </div>

            <Link
              to="/listings"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-main-bg  p-1"
            >
              <span className="font-normal capitalize text-white">
                {isAmh ? "ተጨማሪ ይመልከቱ" : "see more"}
              </span>
              <BsFillArrowRightSquareFill size={20} className="text-white" />
            </Link>
          </div>
          {/* deliveries */}
          <div className="relative flex flex-col bg-white shadow-lg  rounded-lg">
            <div className="flex items-center justify-between p-5 pb-10">
              <div className="flex flex-col items-start space-y-2">
                <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
                  {isAmh ? "መላኪያ ሰው" : "Total Deliveries"}
                </h1>
                {dashboardCounts?.deliveries}
              </div>
              <div className="h-24 w-24">
                <MdDeliveryDining size={80} className="text-[#1c1917]" />
              </div>
            </div>

            <Link
              to="/listings"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-[#1c1917]  p-1"
            >
              <span className="font-normal capitalize text-white">
                {isAmh ? "ተጨማሪ ይመልከቱ" : "see more"}
              </span>
              <BsFillArrowRightSquareFill size={20} className="text-white" />
            </Link>
          </div>
          {/*  products*/}
          <div className="relative flex flex-col bg-white shadow-lg  rounded-lg">
            <div className="flex items-center justify-between p-5 pb-10">
              <div className="flex flex-col items-start space-y-2">
                <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
                  {isAmh ? "ጠቅላላ ምርቶች" : "Total Products"}
                </h1>
                {dashboardCounts?.products}
              </div>
              <div className="h-24 w-24">
                <RiStoreFill size={80} className="text-[#0891b2]" />
              </div>
            </div>

            <Link
              to="/listings"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-[#0891b2]  p-1"
            >
              <span className="font-normal capitalize text-white">
                {isAmh ? "ተጨማሪ ይመልከቱ" : "see more"}
              </span>
              <BsFillArrowRightSquareFill size={20} className="text-white" />
            </Link>
          </div>
          {/* category */}
          <div className="relative flex flex-col bg-white shadow-lg  rounded-lg">
            <div className="flex items-center justify-between p-5 pb-10">
              <div className="flex flex-col items-start space-y-2">
                <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
                  {isAmh ? "ምድቦች" : "Total Categories"}
                </h1>
                {dashboardCounts?.categories}
              </div>
              <div className="h-24 w-24">
                <BiCategory size={80} className="text-[#ea580c]" />
              </div>
            </div>

            <Link
              to="/listings"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-[#ea580c]  p-1"
            >
              <span className="font-normal capitalize text-white">
                {isAmh ? "ተጨማሪ ይመልከቱ" : "see more"}
              </span>
              <BsFillArrowRightSquareFill size={20} className="text-white" />
            </Link>
          </div>
          {/* orders */}
          <div className="relative flex flex-col bg-white shadow-lg  rounded-lg">
            <div className="flex items-center justify-between p-5 pb-10">
              <div className="flex flex-col items-start space-y-2">
                <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
                  {isAmh ? "ጠቅላላ ትዕዛዞች" : "Total Orders"}
                </h1>
                {dashboardCounts?.orders}
              </div>
              <div className="h-24 w-24">
                <BsFillCartCheckFill size={80} className="text-[#4d7c0f]" />
              </div>
            </div>

            <Link
              to="/listings"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-[#4d7c0f]  p-1"
            >
              <span className="font-normal capitalize text-white">
                {isAmh ? "ተጨማሪ ይመልከቱ" : "see more"}
              </span>
              <BsFillArrowRightSquareFill size={20} className="text-white" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#34d399"}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

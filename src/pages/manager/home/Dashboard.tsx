import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { useHome } from "../../../context/HomeContext";
import { IDashboard } from "../../../types/Dashboard";
import { Link } from "react-router-dom";
import {
  BsFillArrowRightSquareFill,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { FaCodeBranch, FaUserAlt } from "react-icons/fa";
import { MdDeliveryDining, MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { RiAdminFill, RiStoreFill } from "react-icons/ri";
import BreedCrumb from "../../../utils/BreedCrumb";
import { mainColor } from "../../../styles/Style";

const Dashboard = () => {
  const { isAmh } = useHome();
  const { user, token } = useAuth();
  const [dashboardCounts, setDashboardCounts] = useState<IDashboard>();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch dashboard counts
  const dashboardData = useQuery(
    ["BranchADashboardData"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}branch-admin/dashboard/${
          user.branch
        }`,
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
      <BreedCrumb />
      {dashboardData.isFetched && dashboardData.isSuccess ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* branch admins */}
          <div className="relative flex flex-col bg-white shadow-lg  rounded-lg">
            <div className="flex items-center justify-between p-5 pb-10">
              <div className="flex flex-col items-start space-y-2">
                <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
                  {isAmh ? "የቅርንጫፍ አስተዳዳሪዎች" : "Branch Admins"}
                </h1>
                <h4 className="text-xl text-blue-color font-semibold">
                  {dashboardCounts?.branchAdmins}
                </h4>
              </div>
              <div className="h-24 w-24">
                <RiAdminFill size={80} className="text-blue-color" />
              </div>
            </div>

            <Link
              to="/branch-admin"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-blue-bg  p-1"
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
                  {isAmh ? "ጠቅላላ ምርቶች" : "Products"}
                </h1>
                <h4 className="text-xl text-blue-color font-semibold">
                  {dashboardCounts?.products}
                </h4>
              </div>
              <div className="h-24 w-24">
                <RiStoreFill size={80} className="text-[#457eac]" />
              </div>
            </div>

            <Link
              to="/Products"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-[#457eac]  p-1"
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
                  {isAmh ? "ምድቦች" : "Categories"}
                </h1>
                <h4 className="text-xl text-blue-color font-semibold">
                  {dashboardCounts?.categories}
                </h4>
              </div>
              <div className="h-24 w-24">
                <BiCategory size={80} className="text-blue-color" />
              </div>
            </div>

            <Link
              to="/categories"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-blue-bg  p-1"
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
                  {isAmh ? "ጠቅላላ ትዕዛዞች" : "Orders"}
                </h1>
                <h4 className="text-xl text-blue-color font-semibold">
                  {dashboardCounts?.orders}
                </h4>
              </div>
              <div className="h-24 w-24">
                <BsFillCartCheckFill size={80} className="text-red-color" />
              </div>
            </div>

            <Link
              to="/orders"
              className="absolute hover:opacity-80 bottom-0 w-full flex items-center justify-center space-x-2 rounded-b-md
cursor-pointer bg-red-bg  p-1"
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
            color={mainColor}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
      <div className="flex flex-col items-start space-y-2 w-full pt-4">
        <h1 className="text-blue-color text-xl font-semibold capitalize dark:text-white ">
          {isAmh ? "የሽያጭ ትንተና" : "Sells analysis"}
        </h1>
        <p>ff</p>
      </div>
    </div>
  );
};

export default Dashboard;

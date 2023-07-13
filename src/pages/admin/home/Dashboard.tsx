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
import Chart from "./components/Chart";
import { mainColor } from "../../../styles/Style";
import TopSellProducts from "./components/TopSellProducts";

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
    ["dashboardDataApi"],
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
  return (
    <div>
      <BreedCrumb />

      {dashboardData.isFetched && dashboardData.isSuccess ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-2">
          {/* customers */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-[#eab308]/30 p-3 rounded-full">
              <FaUserAlt size={20} className="text-[#eab308]" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "ደንበኞች" : "Customers"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.customers}
              </h4>
            </div>
          </div>
          {/* delivery */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-[#c026d3]/30 p-3 rounded-full">
              <MdDeliveryDining size={20} className="text-[#c026d3]" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "መላኪያ ሰው" : "Deliveries"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.customers}
              </h4>
            </div>
          </div>
          {/* branch admins */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-[#7c3aed]/30 p-3 rounded-full">
              <RiAdminFill size={20} className="text-[#7c3aed]" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "የቅርንጫፍ አስተዳዳሪዎች" : "Branch Admins"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.branchAdmins}
              </h4>
            </div>
          </div>
          {/* branches */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-[#0891b2]/20 p-3 rounded-full">
              <FaCodeBranch size={20} className="text-[#0891b2]" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "ቅርንጫፎች" : "Branches"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.branches}
              </h4>
            </div>
          </div>
          {/* products */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-[#457eac]/20 p-3 rounded-full">
              <RiStoreFill size={20} className="text-[#457eac]" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "ጠቅላላ ምርቶች" : "Products"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.products}
              </h4>
            </div>
          </div>
          {/* category */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-[#f97316]/20 p-3 rounded-full">
              <BiCategory size={20} className="text-[#f97316]" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "ምድቦች" : "Categories"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.categories}
              </h4>
            </div>
          </div>
          {/* total orders */}
          <div className="bg-white rounded-sm shadow-md flex items-center space-x-3 p-5 ">
            <div className="bg-red-bg/20 p-3 rounded-full">
              <BsFillCartCheckFill size={20} className="text-red-color" />
            </div>
            <div className="flex flex-col items-start ">
              <h1 className="text-[#8aa1ad] font-medium text-sm capitalize dark:text-white ">
                {isAmh ? "ጠቅላላ ትዕዛዞች" : "Total Orders"}
              </h1>

              <h4 className="text-xl text-blue-color font-semibold">
                {dashboardCounts?.orders}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white p-5 flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={mainColor}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
      <div className="bg-white  w-full p-2 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full items-start">
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-blue-color font-medium capitalize ">
              {isAmh ? "የሽያጭ ትንተና" : "Sells analysis"}
            </h1>
            <Chart />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-blue-color font-medium capitalize ">
              {isAmh ? "የሽያጭ ትንተና" : "Top Sell Products"}
            </h1>

            <TopSellProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

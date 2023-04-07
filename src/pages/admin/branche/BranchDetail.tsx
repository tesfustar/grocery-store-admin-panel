import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { useParams } from "react-router-dom";
import { FaCodeBranch, FaUserAlt } from "react-icons/fa";
import { MdDeliveryDining, MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { RiAdminFill, RiStoreFill } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { IBranchAdmin } from "../../../types/BranchAdmin";
import { IBranchProduct } from "../../../types/Product";
import BranchProductsTable from "./components/BranchProductsTable";
import BranchAdminList from "./components/BranchAdminList";
const BranchDetail = () => {
  const { id } = useParams();
  const { isAmh } = useHome();
  const { token } = useAuth();
  const [branchAdmins, setBranchAdmins] = useState<IBranchAdmin[]>([]);
  const [branchProducts, setBranchProducts] = useState<IBranchProduct[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const branchDetailData = useQuery(
    ["branchDetailData", id],
    async () =>
      await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }admin/branch/detail/${id}`,
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
        console.log(res.data?.data);
        setBranchProducts(
          res.data?.data?.lists?.productList?.map(
            (data: object, index: number) => ({ ...data, index: index + 1 })
          )
        );
        setBranchAdmins(
          res.data?.data?.lists?.branchAdminList?.map(
            (data: object, index: number) => ({ ...data, index: index + 1 })
          )
        );
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  function CountData() {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 flex  items-center justify-between shadow-md">
          <RiStoreFill size={80} className="text-[#457eac]" />
          <div className="flex flex-col items-center">
            <h2 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
              {isAmh ? "" : "Products"}
            </h2>
            <h2 className="text-xl font-semibold text-blue-color">
              {branchDetailData?.data?.data?.data?.counts?.products}
            </h2>
          </div>
        </div>
        {/* order */}
        <div className="bg-white p-4 flex  items-center justify-between shadow-md">
          <BsFillCartCheckFill size={80} className="text-main-color" />
          <div className="flex flex-col items-center">
            <h2 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
              {isAmh ? "ትዕዛዞች" : "Orders"}
            </h2>
            <h2 className="text-xl font-semibold text-blue-color">
              {branchDetailData?.data?.data?.data?.counts?.orders}
            </h2>
          </div>
        </div>
        {/* admins */}
        <div className="bg-white p-4 flex  items-center justify-between shadow-md">
          <FaUserAlt size={80} className="text-[#121212]" />
          <div className="flex flex-col items-center">
            <h2 className="text-[#8aa1ad] font-semibold capitalize dark:text-white ">
              {isAmh ? "አስተዳዳሪዎች" : "Admins"}
            </h2>
            <h2 className="text-xl font-semibold text-blue-color">
              {branchDetailData?.data?.data?.data?.counts?.branchAdmins}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BreedCrumb />
      {branchDetailData.isFetched && branchDetailData.isSuccess ? (
        <div className="flex flex-col items-start space-y-5 w-full">
          <CountData />
          {/* product list */}
          <div className="w-full flex flex-col items-start space-y-2">
            <h2 className="text-[#8aa1ad] font-semibold capitalize dark:text-white text-xl pb-1">
              {isAmh ? "ምርቶች" : "Products"}
            </h2>
            {branchProducts.length > 0 ? (
              <BranchProductsTable branchProducts={branchProducts} />
            ) : (
              <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white text-xl py-5 text-center w-full">
                {isAmh ? "ምንም የሚታዩ ምርቶች የሉም" : "No Products To Show!"}
              </h1>
            )}
          </div>
          {/* admin list */}
          <div className="w-full flex flex-col items-start space-y-2">
            <h2 className="text-[#8aa1ad] font-semibold capitalize dark:text-white text-xl pb-1">
              {isAmh ? "የቅርንጫፍ አስተዳዳሪዎች" : " Branch Admins"}
            </h2>
            {branchAdmins.length > 0 ? (
              <BranchAdminList branchAdmins={branchAdmins} />
            ) : (
              <h1 className="text-[#8aa1ad] font-semibold capitalize dark:text-white text-xl py-5 text-center w-full">
                {isAmh ? "ምንም የቅርንጫፍ አስተዳዳሪዎች አልተገኙም።" : "No Branch Admins Found!"}
              </h1>
            )}
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

export default BranchDetail;

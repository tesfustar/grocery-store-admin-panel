import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import CustomerTable from "./components/CustomerTable";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { IBranchAdmin } from "../../../types/BranchAdmin";
import BranchAdminTable from "./components/BranchAdminTable";
const BranchAdmin: FC = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [branchAdmin, setBranchAdmins] = useState<IBranchAdmin[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch branch admins
  const branchAdminData = useQuery(
    ["branchAdminData", stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/customers`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setBranchAdmins(
          res?.data?.data?.map((data: object, index: number) => ({
            ...data,
            index: index + 1,
          }))
        );
      },
    }
  );
  return (
    <div className="p-3">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ደንበኞች" : "Customers"}
        </h1>
      </div>
      {/*  */}
      {branchAdminData.isFetched && branchAdminData.isSuccess ? (
        <div>
          {branchAdminData?.data?.data?.data?.length > 0 ? (
            <BranchAdminTable
            branchAdmin={branchAdmin}
              setStateChange={setStateChange}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold text-center">
              {isAmh ? "" : "There are No branch admins !"}
            </h1>
          )}
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



export default BranchAdmin
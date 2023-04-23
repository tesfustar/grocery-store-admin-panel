import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import CustomerTable from "./components/CustomerTable";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { IBranchAdmin } from "../../../types/BranchAdmin";
import BranchAdminTable from "./components/BranchAdminTable";
import AddBranchAdminModal from "./components/AddBranchAdminModal";
const BranchAdmin: FC = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [branchAdmin, setBranchAdmins] = useState<IBranchAdmin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/branch-admins`,
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
    <div className="p-3 bg-white">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "አድራሾች" : "Branch Admins"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "አድራሽ ጨምር" : "Add Branch Admin"}
        </button>
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
            color={mainColor}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
        <AddBranchAdminModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setStateChange={setStateChange}
      />
    </div>
  );
};



export default BranchAdmin
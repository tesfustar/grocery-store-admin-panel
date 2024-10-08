import React, { useState } from "react";
// import AddCategoryModal from "./components/AddCategoryModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import CategoryTable from "./components/CategoryTable";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import { IBranchAdmin } from "../../../types/Branch";
import BranchTable from "./components/BranchTable";
import AddBranchModal from "./components/AddBranchModal";

const Branch = () => {

  const { token } = useAuth();
  const { isAmh } = useHome();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [branches, setBranches] = useState<Array<IBranchAdmin>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editBranchId, setEditBranchId] = useState<string | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch branch
  const branchData = useQuery(
    ["branchData", stateChange],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}branch`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setBranches(
          res?.data?.data?.map((data: object, index: number) => ({
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
  return (
    <div className="p-3 bg-white">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-blue-color">
          {isAmh ? "ቅርንጫፎች" : "Branches"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "ቅርንጫፍ አክል" : "Add Branch"}
        </button>
      </div>

      {branchData.isFetched && branchData.isSuccess ? (
        <div className="flex items-center justify-center w-full">
          {branchData?.data?.data?.data?.length > 0 ? (
            <BranchTable
              branches={branches}
              setStateChange={setStateChange}
              setEditBranchId={setEditBranchId}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold">
              {isAmh ? "" : "No Branches found !"}
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
       <AddBranchModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setStateChange={setStateChange}
      />
    </div>
  );
};

export default Branch;

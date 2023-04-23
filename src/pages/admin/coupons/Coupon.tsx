import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../../context/AuthContext";
import { buttonStyle, mainColor } from "../../../styles/Style";
import { useNavigate } from "react-router-dom";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
import AddCouponModal from "./components/AddCouponModal";
import { ICoupon } from "../../../types/Coupon";
import CouponTable from "./components/CouponTable";

const Coupon = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [editCouponId, setEditCouponId] = useState<string | null>(null);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch coupons
  const couponsData = useQuery(
    ["couponsData", stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}coupon`,
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
        setCoupons(
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
        <h1 className="font-semibold text-blue-color">
          {isAmh ? "ኩፖኖች" : "Coupons"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "ኩፖን ጨምር" : "Add Coupon"}
        </button>
      </div>

      {/*  */}
      {couponsData.isFetched && couponsData.isSuccess ? (
        <div className="flex items-center justify-center w-full">
          {couponsData?.data?.data?.data?.length > 0 ? (
            <CouponTable
              coupons={coupons}
              setStateChange={setStateChange}
              setEditCouponId={setEditCouponId}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold">
              {isAmh ? "" : "No Categories found !"}
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
    </div>
  );
};

export default Coupon;

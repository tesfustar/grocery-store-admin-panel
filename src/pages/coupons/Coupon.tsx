import React, { useState, FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../context/AuthContext";
import { buttonStyle } from "../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/User";
import { useHome } from "../../context/HomeContext";
import BreedCrumb from "../../utils/BreedCrumb";
import AddCouponModal from "./components/AddCouponModal";

const Coupon = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<IUser[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch deliveries
  const couponsData = useQuery(
    ["couponsData", stateChange],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/deliveries`,
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
    <div className="p-3">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ኩፖኖች" : "Coupons"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "ኩፖን ጨምር" : "Add Coupon"}
        </button>
      </div>
    </div>
  );
};

export default Coupon;

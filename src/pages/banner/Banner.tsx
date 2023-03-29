import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHome } from "../../context/HomeContext";
import { buttonStyle } from "../../styles/Style";
import { IBanner } from "../../types/Banner";
import BreedCrumb from "../../utils/BreedCrumb";
import BannerTable from "./components/BannerTable";
import ReactLoading from "react-loading";
import AddBannerModal from "./components/AddBannerModal";
const Banner = () => {
  const { isAmh } = useHome();
  const { token } = useAuth();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [banners, setBanners] = useState<Array<IBanner>>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editBannerId, setEditBannerId] = useState<string | null>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch Banner
  const bannerData = useQuery(
    ["bannerDataApi", stateChange],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}banner`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setBanners(
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
    <div className="p-3">
      <BreedCrumb />
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">
          {isAmh ? "ባነሮች" : "Banners"}
        </h1>
        <button onClick={() => setIsModalOpen(true)} className={buttonStyle}>
          {isAmh ? "ባነር ጨምር" : "Add Banner"}
        </button>
      </div>
      {bannerData.isFetched && bannerData.isSuccess ? (
        <div>
          {bannerData?.data?.data?.data?.length > 0 ? (
            <BannerTable
              banners={banners}
              setStateChange={setStateChange}
              setEditBannerId={setEditBannerId}
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <h1 className="text-blue-color text-xl capitalize font-semibold text-center">
              {isAmh ? "" : "There is no ad banner !"}
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

      <AddBannerModal
        setEditBannerId={setEditBannerId}
        isModalOpen={isModalOpen}
        editBannerId={editBannerId}
        setStateChange={setStateChange}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Banner;

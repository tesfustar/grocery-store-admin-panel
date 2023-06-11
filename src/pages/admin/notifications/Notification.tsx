import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import { mainColor } from "../../../styles/Style";
import { useHome } from "../../../context/HomeContext";
import BreedCrumb from "../../../utils/BreedCrumb";
const Notification = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { notificationStatus, setNotificationStatus, isAmh } = useHome();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const allNotifications = useQuery(
    ["allNotificationDataApi"],
    async () =>
      await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}notification/admin`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
    }
  );

  //mark as read notification
  const markAsReadMutation = useMutation(
    async (id) =>
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}notification/read/${id}`
      ),
    {
      retry: false,
    }
  );
  const markAsReadNotificationMutationHandler = async (id: any) => {
    try {
      markAsReadMutation.mutate(id, {
        onSuccess: (responseData) => {
          setNotificationStatus((prev: boolean) => !prev);
        },
        onError: (err) => {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  const markAllAsReadMutation = useMutation(
    async (id) =>
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}notification/read/${id}`
      ),
    {
      retry: false,
    }
  );
  const markAllAsReadNotificationMutationHandler = async (id: any) => {
    try {
      markAllAsReadMutation.mutate(id, {
        onSuccess: (responseData) => {
          setNotificationStatus((prev: boolean) => !prev);
        },
        onError: (err) => {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-3 ">
      <BreedCrumb />

      <div className="bg-white  p-2 rounded-lg">
        <h1 className="font-semibold text-blue-color">
          {isAmh ? "ትዕዛዞች" : "Notifications"}
        </h1>

        <div>
          <div className="w-full ">
            {allNotifications.isFetched ? (
              allNotifications?.data?.data?.data?.length > 0 ? (
                <div className="flex flex-col items-start space-y-2 w-full">
                  <div className="flex items-end justify-end self-end  w-full">
                    <button
                      onClick={() =>
                        markAllAsReadNotificationMutationHandler(1)
                      }
                      className="text-[13px] bg-main-bg/30 rounded-full p-1 px-2 font-medium text-amin-color"
                    >
                      Mark All As Read
                    </button>
                  </div>
                  {allNotifications?.data?.data?.data?.map((item: any) => (
                    <div
                      className="flex  items-start space-x-1 md:space-x-4 w-full h-[90px]
                   bg-white shadow-md rounded-lg dark:bg-[#292931]"
                    >
                      {item.readAt == null && (
                        <div className="bg-main-bg w-2 h-full rounded-l-lg" />
                      )}
                      <div className="flex items-center h-20 justify-between w-full  px-3">
                        <div>
                          <h1 className="font-medium text-dark-color dark:text-gray-300 text-lg ">
                            {item.title}
                          </h1>
                          <p className=" text-dark-gray dark:text-gray-300 text-[14px]">
                            {item.message}
                          </p>
                        </div>

                        <div className="flex flex-col   justify-between items-end h-full pt-4">
                          {item.readAt == null && (
                            <button
                              onClick={() =>
                                markAsReadNotificationMutationHandler(item._id)
                              }
                              className="text-[13px]  bg-main-bg/30 text-main-color rounded-full p-1 px-3 font-medium items-start self-start"
                            >
                              Mark As Read
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (item.order) {
                                navigate(`/orders/detail/${item.order}`);
                                markAsReadNotificationMutationHandler(item._id);
                              } else if (item.productRequest) {
                                navigate(
                                  `/request/detail/${item.productRequest}`
                                );
                                markAsReadNotificationMutationHandler(item._id);
                              }
                            }}
                            className="text-[13px]  bg-green-500/30 rounded-full p-1 px-3 font-medium text-green-500 items-start self-start"
                          >
                            see detail
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center text-center w-full">
                  <h1 className="font-medium text-dark-color dark:text-gray-300 text-lg ">
                    You Have No Notification
                  </h1>
                </div>
              )
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
        </div>
      </div>
    </div>
  );
};

export default Notification;

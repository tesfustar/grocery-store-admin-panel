import React, { useState ,FC} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactLoading from "react-loading";
import { useAuth } from "../../context/AuthContext";
import { buttonStyle } from "../../styles/Style";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/User";
import CustomerTable from "./components/CustomerTable";
import { useHome } from "../../context/HomeContext";
const Customers:FC = () => {
  const {isAmh} = useHome()
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [customers, setCustomers] = useState<IUser[]>([]);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  //fetch customers
  const customersData = useQuery(
    ["customersData", stateChange],
    async () =>
      await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}admin/customers`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {
        setCustomers(
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
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-semibold text-dark-gray">{isAmh ?  "ደንበኞች":'Customers'}</h1>
  
      </div>
      {/*  */}
      {customersData.isFetched && customersData.isSuccess ? (
        <div>
          <CustomerTable
            customers={customers}
            setStateChange={setStateChange}
          />
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

export default Customers;
